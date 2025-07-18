import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [editingRestaurantId, setEditingRestaurantId] = useState(null);

  const [newUser, setNewUser] = useState({
    name: '', email: '', password: '',
    phone: '', address: '', gender: '', role: 'user'
  });

  const [newRestaurant, setNewRestaurant] = useState({
    name: '', address: '', contactNumber: '',
    email: '', imageUrl: '', ownerEmail: ''
  });

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const [newMenuItem, setNewMenuItem] = useState({
    name: '', description: '', category: '', price: '',
    imageUrl: '', veg: true, availability: true, restaurantId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRestaurants();
    fetchCategories();
    fetchMenuItems();
    fetchReviews();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get('/api/restaurants');
      setRestaurants(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('/api/menu-items');
      setMenuItems(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAdd = (url, payload, fetchFn, resetFn) => async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, payload());
      fetchFn();
      resetFn();
    } catch {
      alert('❌ Failed to add.');
    }
  };

  const handleDelete = (url, fetchFn) => async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${url}/${id}`);
      fetchFn();
    } catch {
      console.error('Delete failed', id);
    }
  };

  const buildNewRestaurant = () => {
    const { ownerEmail, ...rest } = newRestaurant;
    return { ...rest, owner: ownerEmail ? { email: ownerEmail } : null };
  };

  const buildNewMenuItem = () => ({
    ...newMenuItem,
    price: parseFloat(newMenuItem.price),
    restaurant: { id: parseInt(newMenuItem.restaurantId) }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🌿 Admin Dashboard</h1>
        <div>Hello, <span className="highlight">{currentUser?.name || currentUser?.email}</span></div>
      </header>

      {/* Add User */}
      <section className="admin-section green">
        <h3>➕ Add New User</h3>
        <form onSubmit={handleAdd('/api/users', () => newUser, fetchUsers, () => setNewUser({ name:'',email:'',password:'',phone:'',address:'',gender:'',role:'user' }))}>
          <div className="row">
            <input name="name" value={newUser.name} placeholder="Name" onChange={handleChange(setNewUser)} required />
            <input name="email" type="email" value={newUser.email} placeholder="Email" onChange={handleChange(setNewUser)} required />
            <input name="password" type="password" value={newUser.password} placeholder="Password" onChange={handleChange(setNewUser)} required />
          </div>
          <div className="row">
            <input name="phone" value={newUser.phone} placeholder="Phone" onChange={handleChange(setNewUser)} required />
            <input name="address" value={newUser.address} placeholder="Address" onChange={handleChange(setNewUser)} required />
            <select name="gender" value={newUser.gender} onChange={handleChange(setNewUser)} required>
              <option value="">Gender</option><option value="male">Male</option><option value="female">Female</option>
            </select>
            <select name="role" value={newUser.role} onChange={handleChange(setNewUser)} required>
              <option value="user">User</option><option value="restaurant">Restaurant</option><option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Add User</button>
        </form>
      </section>

      {/* All Users */}
      <section className="admin-section yellow">
        <h3>👥 All Users</h3>
        <table>
          <thead><tr><th>Email</th><th>Name</th><th>Phone</th><th>Gender</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>{users.map(u => <tr key={u.email}><td>{u.email}</td><td>{u.name}</td><td>{u.phone}</td><td>{u.gender}</td><td>{u.role}</td><td><button className="del" onClick={() => handleDelete('/api/users', fetchUsers)(u.email)}>Delete</button></td></tr>)}</tbody>
        </table>
      </section>

      {/* Restaurant */}
      <section className="admin-section orange">
        <h3>🏬 Add / Edit Restaurant</h3>
        <form onSubmit={editingRestaurantId ? async(e)=>{e.preventDefault(); await axios.put(`/api/restaurants/${editingRestaurantId}`, buildNewRestaurant()); fetchRestaurants(); setNewRestaurant({ name:'',address:'',contactNumber:'',email:'',imageUrl:'',ownerEmail:'' }); setEditingRestaurantId(null)} : handleAdd('/api/restaurants', buildNewRestaurant, fetchRestaurants, () => setNewRestaurant({ name:'',address:'',contactNumber:'',email:'',imageUrl:'', ownerEmail:'' }))}>
          <div className="row">
            <input name="name" value={newRestaurant.name} placeholder="Name" onChange={handleChange(setNewRestaurant)} required />
            <input name="address" value={newRestaurant.address} placeholder="Address" onChange={handleChange(setNewRestaurant)} required />
            <input name="contactNumber" value={newRestaurant.contactNumber} placeholder="Contact" onChange={handleChange(setNewRestaurant)} required />
            <input name="email" type="email" value={newRestaurant.email} placeholder="Email" onChange={handleChange(setNewRestaurant)} disabled={!!editingRestaurantId} />
          </div>
          <div className="row">
            <input name="imageUrl" value={newRestaurant.imageUrl} placeholder="Image URL" onChange={handleChange(setNewRestaurant)} />
            <select name="ownerEmail" value={newRestaurant.ownerEmail} onChange={handleChange(setNewRestaurant)} required={!editingRestaurantId}>
              <option value="">Select Owner</option>
              {users.filter(u => u.role==='restaurant').map(u => <option key={u.email} value={u.email}>{u.name}</option>)}
            </select>
          </div>
          <button type="submit">{editingRestaurantId ? 'Update Restaurant' : 'Add Restaurant'}</button>
        </form>

        <h3>🍴 All Restaurants</h3>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Contact</th><th>Email</th><th>Owner</th><th>Actions</th></tr></thead>
          <tbody>{restaurants.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.contactNumber}</td><td>{r.email}</td><td>{r.owner?.name}</td><td><button onClick={()=>{setEditingRestaurantId(r.id); setNewRestaurant({ name:r.name,address:r.address,contactNumber:r.contactNumber,email:r.email,imageUrl:r.imageUrl,ownerEmail:r.owner?.email||'' })}}>Edit</button> <button className="del" onClick={() => handleDelete('/api/restaurants', fetchRestaurants)(r.id)}>Delete</button></td></tr>)}</tbody>
        </table>
      </section>

      {/* Category */}
      <section className="admin-section green">
        <h3>📂 Add Category</h3>
        <form onSubmit={handleAdd('/api/categories', () => newCategory, fetchCategories, () => setNewCategory({ name:'',description:'' }))}>
          <div className="row">
            <input name="name" value={newCategory.name} placeholder="Name" onChange={handleChange(setNewCategory)} required />
            <input name="description" value={newCategory.description} placeholder="Description" onChange={handleChange(setNewCategory)} />
          </div>
          <button type="submit">Add Category</button>
        </form>

        <h3>📋 All Categories</h3>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Action</th></tr></thead>
          <tbody>{categories.map(c => <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.description}</td><td><button className="del" onClick={() => handleDelete('/api/categories', fetchCategories)(c.id)}>Delete</button></td></tr>)}</tbody>
        </table>
      </section>

      {/* Menu Items */}
      <section className="admin-section yellow">
        <h3>🍔 Add Menu Item</h3>
        <form onSubmit={handleAdd('/api/menu-items', buildNewMenuItem, fetchMenuItems, () => setNewMenuItem({ name:'',description:'',category:'',price:'',imageUrl:'',veg:true,availability:true,restaurantId:'' }))}>
          <div className="row">
            <input name="name" value={newMenuItem.name} placeholder="Name" onChange={handleChange(setNewMenuItem)} required />
            <input name="description" value={newMenuItem.description} placeholder="Description" onChange={handleChange(setNewMenuItem)} required />
            <input name="category" value={newMenuItem.category} placeholder="Category" onChange={handleChange(setNewMenuItem)} required />
            <input name="price" type="number" value={newMenuItem.price} placeholder="Price" onChange={handleChange(setNewMenuItem)} required />
          </div>
          <div className="row">
            <input name="imageUrl" value={newMenuItem.imageUrl} placeholder="Image URL" onChange={handleChange(setNewMenuItem)} />
            <select name="restaurantId" value={newMenuItem.restaurantId} onChange={handleChange(setNewMenuItem)} required>
              <option value="">Select Restaurant</option>
              {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <div className="inline-checkbox-group">
              <label><input name="veg" type="checkbox" checked={newMenuItem.veg} onChange={handleChange(setNewMenuItem)} />🌱 Veg</label>
              <label><input name="availability" type="checkbox" checked={newMenuItem.availability} onChange={handleChange(setNewMenuItem)} />✅ Available</label>
            </div>
          </div>
          <button type="submit">Add Menu Item</button>
        </form>

        <h3>📋 All Menu Items</h3>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Veg</th><th>Available</th><th>Restaurant</th><th>Action</th></tr></thead>
          <tbody>{menuItems.map(m => <tr key={m.id}><td>{m.id}</td><td>{m.name}</td><td>{m.category}</td><td>₹{m.price}</td><td>{m.veg ? '✔️' : '❌'}</td><td>{m.availability ? '✔️' : '❌'}</td><td>{m.restaurant?.name}</td><td><button className="del" onClick={() => handleDelete('/api/menu-items', fetchMenuItems)(m.id)}>Delete</button></td></tr>)}</tbody>
        </table>
      </section>

      {/* 📝 Reviews */}
      <section className="admin-section reviews">
        <h3>📝 User Reviews</h3>
        {reviews.length === 0 ? (
          <p className="empty-msg">No reviews yet! 😶</p>
        ) : (
          <table>
            <thead>
              <tr><th>🌟 Rating</th><th>🗣️ Comment</th><th>🍽️ Menu Item</th><th>👤 User</th><th>🕒 Date</th></tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id}>
                  <td>⭐ {r.rating}</td>
                  <td>{r.comment}</td>
                  <td>{r.menuItem?.name || '-'}</td>
                  <td>{r.user?.name || r.user?.email}</td>
                  <td>{new Date(r.reviewDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer className="admin-footer">
        <button className="logout" onClick={handleLogout}>Logout</button>
      </footer>
    </div>
  );
};

export default AdminDashboard;
