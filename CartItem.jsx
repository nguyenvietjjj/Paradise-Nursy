import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalCartAmount = cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Amount: ${totalCartAmount}</h3>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="product-grid">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>Unit Price: ${item.cost}</p>
              <p>Total Cost: ${item.cost * item.quantity}</p>
              
              <div className="cart-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <button className="delete-btn" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-btn" onClick={() => alert("Coming Soon!")}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
