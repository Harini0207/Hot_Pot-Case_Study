import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderHistory.css';

const OrderHistory = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewData, setReviewData] = useState({ comment: '', rating: 5, menuItemId: null });

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserEmail(parsed.email);
    } else if (currentUser?.email) {
      setUserEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/orders/user/${userEmail}`);
        const data = Array.isArray(res.data) ? res.data : [];
        const sorted = data
          .filter(order => order.orderDate)
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sorted);
      } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews`);
        const userReviews = res.data.filter(r => r.user.email === userEmail);
        setReviews(userReviews);
      } catch (err) {
        console.error('❌ Failed to fetch reviews:', err);
      }
    };

    if (userEmail) {
      fetchOrders();
      fetchReviews();
    }
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user: { email: userEmail },
        menuItem: { id: reviewData.menuItemId },
        rating: parseInt(reviewData.rating),
        comment: reviewData.comment,
      };

      if (editingReviewId) {
        await axios.delete(`/api/reviews/${editingReviewId}`);
      }
      await axios.post('/api/reviews', payload);

      setReviewData({ comment: '', rating: 5, menuItemId: null });
      setEditingReviewId(null);

      const res = await axios.get(`/api/reviews`);
      setReviews(res.data.filter(r => r.user.email === userEmail));
    } catch (err) {
      alert('❌ Review submission failed.');
    }
  };

  const handleEdit = (review) => {
    setReviewData({
      comment: review.comment,
      rating: review.rating,
      menuItemId: review.menuItem.id
    });
    setEditingReviewId(review.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      console.error('❌ Delete failed', err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="order-container">
      <h2>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-msg">No orders found 🥲</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h5>📅 {new Date(order.orderDate).toLocaleString()}</h5>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>

              <button className="btn-view-details" onClick={() => navigate(`/orders/${order.id}`)}>
                 View Details
              </button>

              <div className="items">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>🍽 {item.menuItem.name}</span> — ₹{item.menuItem.price} × {item.quantity}

                    <div className="review-form">
                      <form onSubmit={handleSubmitReview}>
                        <input type="hidden" name="menuItemId" value={item.menuItem.id} />
                        <textarea
                          name="comment"
                          placeholder=" Leave a review..."
                          value={reviewData.menuItemId === item.menuItem.id ? reviewData.comment : ''}
                          onChange={handleChange}
                          required
                        />
                        <input
                          type="number"
                          name="rating"
                          min="1"
                          max="5"
                          value={reviewData.menuItemId === item.menuItem.id ? reviewData.rating : 5}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="submit"
                          onClick={() => setReviewData({ ...reviewData, menuItemId: item.menuItem.id })}
                        >
                          {editingReviewId ? '✏️ Update' : '➕ Add Review'}
                        </button>
                      </form>

                      {/* Existing Reviews for this menuItem */}
                      <ul className="reviews">
                        {reviews
                          .filter(r => r.menuItem.id === item.menuItem.id)
                          .map(r => (
                            <li key={r.id}>
                              <span>⭐ {r.rating}</span> {r.comment}
                              <button className="edit" onClick={() => handleEdit(r)}>EDIT</button>
                              <button className="delete" onClick={() => handleDelete(r.id)}>DELETE</button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn-back" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
};

export default OrderHistory;
