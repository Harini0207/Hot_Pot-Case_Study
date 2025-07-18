import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDashboard.css';

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};
const images = importAll(require.context('../images', false, /\.(jpg|jpeg|png)$/));

const UserDashboard = ({ currentUser }) => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    dietType: '',
    priceRange: '',
    keyword: ''
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get('/api/menu-items');
      setMenus(res.data);
    } catch (err) {
      console.error('Failed to load menus:', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await axios.get(`/api/menu-items/filter?${query}`);
      setMenus(res.data);
    } catch (err) {
      console.error('Filter failed:', err);
    }
  };

  const addToCart = async (menuId) => {
    if (!currentUser?.email) {
      alert("User not logged in.");
      return;
    }

    try {
      await axios.post('/api/cart/add', {
        email: currentUser.email,
        menuId: menuId.toString(),
        quantity: "1"
      });
      alert('Item added to cart!');
      navigate('/cart');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      alert('Error adding to cart.');
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getImagePath = (fileName) => {
    return images[fileName] || null;
  };

  return (
    <div className="container mt-5 dashboard">
      <h2 className="text-maroon">Welcome, {currentUser?.name}! 👋</h2>
      <p className="mb-4">We're delighted to serve you delicious meals. Explore our menu below!</p>

      {/* Filter */}
      <form onSubmit={handleFilterSubmit} className="row g-3 mb-4 bg-light p-3 rounded">
        <div className="col-md-3">
          <label className="form-label fw-bold">Category</label>
          <select name="category" className="form-select border-warning" onChange={handleFilterChange}>
            <option value="">All</option>
            <option>Main Course</option>
            <option>South Indian</option>
            <option>Dinner</option>
            <option>Starters</option>
            <option>Breads</option>
            <option>Italian</option>
            <option>Arabian</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">Type</label>
          <select name="dietType" className="form-select border-success" onChange={handleFilterChange}>
            <option value="">All</option>
            <option>Veg</option>
            <option>Nonveg</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">Price</label>
          <select name="priceRange" className="form-select border-primary" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="0-100">Below ₹100</option>
            <option value="100-200">₹100 - ₹200</option>
            <option value="200-500">₹200 - ₹500</option>
            <option value="500-1000">Above ₹500</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">Search</label>
          <input
            type="text"
            name="keyword"
            placeholder="By name or ingredient..."
            className="form-control"
            onChange={handleFilterChange}
            list="menuSuggestions"
          />
          <datalist id="menuSuggestions">
            {menus.map(menu => (
              <option key={menu.id} value={menu.name} />
            ))}
          </datalist>
        </div>
        <div className="col-md-12 text-end">
          <button type="submit" className="btn btn-primary">🔍 Filter</button>
        </div>
      </form>

      {/* Menu*/}
      <h4 className="mt-4 mb-3 text-maroon">Available Menu Items 🍽️</h4>
      <div className="row">
        {menus.map(menu => {
          const imageSrc = getImagePath(menu.imageUrl);
          return (
            <div className="col-md-4 mb-4" key={menu.id}>
              <div className="card h-100">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={menu.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="card-img-top text-center p-5 bg-light text-muted">Image not found</div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{menu.name}</h5>
                  <p className="card-text">
                    <b>Price:</b> ₹{menu.price}<br />
                    <b>Category:</b> {menu.category}<br />
                    <b>Restaurant:</b> {menu.restaurant?.name}
                  </p>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => navigate(`/menu/view/${menu.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => addToCart(menu.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom  */}
      <div className="mt-4">
        <button className="btn btn-warning" onClick={() => navigate('/cart')}>🛒 View Cart</button>
        <button className="btn btn-danger ms-2" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default UserDashboard;
