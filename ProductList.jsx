import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const plantsData = [
  {
    category: "Air Purifying",
    plants: [
      { name: "Snake Plant", price: 15, image: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Spider Plant", price: 12, image: "https://images.unsplash.com/photo-1615555460592-2309e3e31818?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Peace Lily", price: 18, image: "https://images.unsplash.com/photo-1593121526463-5f07df46a2ee?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Boston Fern", price: 14, image: "https://images.unsplash.com/photo-1633511671239-2ce1dbb912ab?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Rubber Plant", price: 20, image: "https://images.unsplash.com/photo-1606708688432-8df7d9d0e2c8?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Aloe Vera", price: 10, image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d736bb?ixlib=rb-4.0.3&w=400&q=80" }
    ]
  },
  {
    category: "Succulents",
    plants: [
      { name: "Echeveria", price: 8, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Jade Plant", price: 12, image: "https://images.unsplash.com/photo-1597055181308-f29e2eb42df9?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Zebra Haworthia", price: 9, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Burro's Tail", price: 15, image: "https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "String of Pearls", price: 14, image: "https://images.unsplash.com/photo-1597401701340-02cda3a8080f?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Panda Plant", price: 11, image: "https://images.unsplash.com/photo-1620127252536-029415494eb5?ixlib=rb-4.0.3&w=400&q=80" }
    ]
  },
  {
    category: "Flowering",
    plants: [
      { name: "Orchid", price: 25, image: "https://images.unsplash.com/photo-1512722055182-41481b4097f5?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "African Violet", price: 12, image: "https://images.unsplash.com/photo-1592150372332-901bba297df3?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Anthurium", price: 22, image: "https://images.unsplash.com/photo-1600406859591-11b3320f7f32?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Bromeliad", price: 18, image: "https://images.unsplash.com/photo-1610443905898-d14fb8f506e7?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Christmas Cactus", price: 15, image: "https://images.unsplash.com/photo-1639645934149-8d195baab339?ixlib=rb-4.0.3&w=400&q=80" },
      { name: "Kalanchoe", price: 10, image: "https://images.unsplash.com/photo-1620562762295-886915f0d381?ixlib=rb-4.0.3&w=400&q=80" }
    ]
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.price }));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => window.location.reload()}>Home</span>
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>Cart ({totalItems})</span>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-list">
          {plantsData.map((category, index) => (
            <div key={index} className="category-section">
              <h3>{category.category}</h3>
              <div className="product-grid">
                {category.plants.map((plant, idx) => (
                  <div key={idx} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h4>{plant.name}</h4>
                    <p>${plant.price}</p>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                    >
                      {isAddedToCart(plant.name) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;