
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import pizza from '../images/pizza.jpg';
import burger from '../images/burger.jpg';
import sushi from '../images/sushi.jpg';
import taco from '../images/taco.jpg';
import noodles from '../images/noodles.jpg';
import foodImage from '../images/food.jpg';

const Home = () => {
  const floatingImages = [
    { src: pizza, className: 'img1' },
    { src: burger, className: 'img2' },
    { src: sushi, className: 'img3' },
    { src: taco, className: 'img4' },
    { src: noodles, className: 'img5' },
    { src: pizza, className: 'img6' },
    { src: burger, className: 'img7' },
    { src: sushi, className: 'img8' },
    { src: taco, className: 'img9' },
    { src: noodles, className: 'img10' },
    { src: sushi, className: 'img11' },
    { src: burger, className: 'img12' },
  ];

  return (
    <div className="home-body">
      {floatingImages.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt="floating"
          className={`floating-img ${img.className}`}
        />
      ))}

      <div className="container mt-5 text-center home-content">
        <h1>Welcome to HotByte 🍔</h1>
        <p>Your favorite food delivered fast at your door!</p>
        <img
          src={foodImage}
          alt="Food Banner"
          className="img-fluid rounded shadow food-banner"
          style={{ maxWidth: '600px' }}
        />
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h4>About HotByte</h4>
            <p>We bring delicious meals from your favorite restaurants straight to your door.</p>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@hotbyte.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Chennai, India</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/help">Help Center</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 HotByte. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
