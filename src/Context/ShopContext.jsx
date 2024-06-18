import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let product of all_product) {
        cart[product.id] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        console.log("Cart Items:", cartItems);
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 0) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                return prev;
            }
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (let itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const product = all_product.find(p => p.id === parseInt(itemId));
                if (product) {
                    totalAmount += cartItems[itemId] * product.new_price;
                }
            }
        }
        return totalAmount.toFixed(2);
    }
    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
            {
                if(cartItems[item]>0)
                    {
                        totalItem+=cartItems[item];
                    }
            }
            return totalItem;
    }

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
