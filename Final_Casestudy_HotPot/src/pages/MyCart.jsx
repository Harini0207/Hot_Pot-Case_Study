import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import '../styles/MyCart.css';
import { useNavigate } from 'react-router-dom';

const MyCart = ({ currentUser }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`/api/cart/${currentUser.email}`);
        setCartItems(res.data);
        const initialQuantities = {};
        res.data.forEach(item => {
          initialQuantities[item.id] = item.quantity || 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('❌ Failed to fetch cart items:', err);
      }
    };

    if (currentUser?.email) {
      fetchCart();
    }
  }, [currentUser]);

  const handleQuantityChange = (id, value) => {
    const val = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: val }));
  };

  const handleUpdateCart = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        cartItems.map((item) =>
          axios.put(`/api/cart/update/${item.id}`, null, {
            params: { quantity: quantities[item.id] },
          })
        )
      );
      alert(' Cart updated successfully!');
    } catch (err) {
      alert('❌ Failed to update cart.');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`/api/cart/remove/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('❌ Failed to remove item.');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user: {
          email: currentUser.email
        },
        shippingAddress,
        paymentMethod,
        orderItems: cartItems.map(item => ({
          menuItem: { id: item.menuItem.id },
          quantity: quantities[item.id]
        }))
      };

      await axios.post('/api/orders/place', payload);
      alert(' Order placed successfully!');
      setCartItems([]);
      navigate('/orders');
    } catch (err) {
      alert('❌ Failed to place order.');
      console.error(err);
    }
  };

  const getTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.menuItem.price * quantities[item.id],
      0
    );

  return (
    <div className="container mt-5 my-cart-page">
      <h2 className="msg">Oh!Hello😄</h2>
      <h2 className="cart-title">🛍️ Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty.</p>
      ) : (
        <>
          <form onSubmit={handleUpdateCart}>
            <table className="table table-bordered align-middle text-center cart-table">
              <thead className="table-head">
                <tr>
                  <th>Menu Item</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center item-cell">
                      <img
                        src={require(`../images/${item.menuItem.imageUrl}`)}
                        alt={item.menuItem.name}
                        width="60"
                        height="60"
                        className="rounded me-2"
                      />
                      <span>{item.menuItem.name}</span>
                    </td>
                    <td>{item.menuItem.category}</td>
                    <td>₹{item.menuItem.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        className="form-control qty-input"
                        value={quantities[item.id]}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                    </td>
                    <td>₹{item.menuItem.price * quantities[item.id]}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center cart-total-row">
              <h4>Total: ₹{getTotal()}</h4>
              <button type="submit" className="btn update-btn">🔄 Update Quantities</button>
            </div>
          </form>

          <form onSubmit={handlePlaceOrder} className="place-order-form">
            <div className="mb-3">
              <label htmlFor="shippingAddress" className="form-label">📍 Shipping Address:</label>
              <textarea
                className="form-control"
                id="shippingAddress"
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">💳 Payment Method:</label>
              <select
                className="form-select"
                id="paymentMethod"
                required
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">-- Select Payment --</option>
                <option value="COD">Cash on Delivery</option>
                <option value="CARD">Credit/Debit Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success place-order-btn">📦 Confirm & Place Order</button>
          </form>
        </>
      )}

      <button className="btn btn-secondary mt-4 back-btn" onClick={() => window.history.back()}>
        ⬅ Back to Menu
      </button>
    </div>
  );
};

export default MyCart;
