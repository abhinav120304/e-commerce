import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Filter products based on the category
  const menProducts = all_product.filter(item => item.category === props.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{Math.min(12, menProducts.length)}</span> out of {menProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Dropdown icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {/* Render filtered products */}
        {menProducts.slice(0, 12).map((item, index) => (
          <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
