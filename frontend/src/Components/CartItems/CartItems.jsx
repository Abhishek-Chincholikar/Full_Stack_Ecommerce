import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";
// Add useNavigate

const CartItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);
  // --- PASTE THIS BLOCK START ---
  const navigate = useNavigate();

  const checkout = async () => {
    // 1. Check if user is logged in
    if(!localStorage.getItem('auth-token')){
      alert("Please Login to Checkout");
      navigate("/login");
      return;
    }

    // 2. Prepare the order data
    let orderItems = [];
    products.map((item) => {
       if(cartItems[item.id] > 0) {
           let itemInfo = item;
           itemInfo['quantity'] = cartItems[item.id];
           orderItems.push(itemInfo);
       }
       return null;
    });

    // 3. Send to Backend
    await fetch(backend_url + '/placeorder', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          items: orderItems,
          amount: getTotalCartAmount()
      })
    })
    .then((resp) => resp.json())
    .then((data) => {
        if(data.success){
            alert("Order Placed Successfully!");
            window.location.replace("/orders"); // Redirects to new page
        } else {
            alert("Failed to place order.");
        }
    });
  }
  // --- PASTE THIS BLOCK END ---

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <img className="cartitems-product-icon" src={backend_url+e.image} alt="" />
                      <p className="cartitems-product-title">{e.name}</p>
                      <p>{currency}{e.new_price}</p>
                      <button className="cartitems-quantity">{cartItems[e.id]}</button>
                      <p>{currency}{e.new_price*cartItems[e.id]}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
            <button onClick={checkout}>PROCEED TO CHECKOUT</button>        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
