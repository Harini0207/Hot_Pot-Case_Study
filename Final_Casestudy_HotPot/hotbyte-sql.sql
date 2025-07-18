create database hotbytedb;
use hotbytedb;
select * from restaurant;
select * from menu_item;
select * from users;
select * from category;
USE hotbytedb;

INSERT INTO users (email, password, name, phone, address, gender, role) VALUES
('admin@hotbyte.com', '1234', 'Admin', '8122369567', 'Admin Office', 'female', 'admin'),
('fresh@gmail.com', '1234', 'FreshBite', '9698994545', 'Spiceville Court', 'female', 'restaurant'),
('harinihr0209@gmail.com', 'har@123', 'Harini', '9444389500', 'home', 'female', 'user'),
('joshy@gmail.com', 'jules@123', 'Josh', '8976543210', 'Brooklyn,NyC', 'male', 'user'),
('maxwork@gmail.com', 'kelly@123', 'FunMax', '8976543201', 'Chennai', 'female', 'restaurant'),
('mx@gmail.com', '1234', 'MX Group', '8976543210', 'Chennai', 'male', 'restaurant'),
('tastegood@gmail.com', 'taste@123', 'TastyWay', '8769543210', 'Chennai', 'female', 'restaurant'),
('verst33@gmail.com', 'lily@123', 'Verst', '9678543210', 'Chennai', 'male', 'restaurant');
USE hotbytedb;
INSERT INTO restaurant (name, address, contact_number, email, image_url, owner_email) VALUES
('FreshBite', 'Spiceville Court, Chennai', '9698994545', 'fresh@gmail.com', 'https://example.com/images/freshbite.jpg', 'fresh@gmail.com'),
('FunMax', 'Chennai Main Road', '8976543201', 'maxwork@gmail.com', 'https://example.com/images/funmax.jpg', 'maxwork@gmail.com'),
('MX Group', 'Velachery, Chennai', '8976543210', 'mx@gmail.com', 'https://example.com/images/mxgroup.jpg', 'mx@gmail.com'),
('TastyWay', 'Tambaram, Chennai', '8769543210', 'tastegood@gmail.com', 'https://example.com/images/tastyway.jpg', 'tastegood@gmail.com'),
('Verst', 'Guindy, Chennai', '9678543210', 'verst33@gmail.com', 'https://example.com/images/verst.jpg', 'verst33@gmail.com');


INSERT INTO menu_item (name, price, restaurant_id, veg, category, description, image_url, availability) VALUES
-- FreshBite (id = 8)
('Fish Fry', 250.00, 8, 0, 'Non-Veg', 'Spicy fried fish served with lemon', 'fish.jpg', true),
('Gobi 65', 120.00, 8, 1, 'Starter', 'Crispy cauliflower fry with spices', 'gobi.jpg', true),
('Gulab Jamun', 90.00, 8, 1, 'Dessert', 'Sweet syrup-soaked softballs', 'gulab.jpg', true),

-- FunMax (id = 9)
('Paneer Butter Masala', 180.00, 9, 1, 'Main Course', 'Cottage cheese in creamy tomato gravy', 'pbm.jpg', true),
('Veg Pulao', 150.00, 9, 1, 'Main Course', 'Aromatic rice cooked with vegetables', 'pulao.jpg', true),
('Idli', 60.00, 9, 1, 'Breakfast', 'Steamed rice cakes served with chutney', 'idli.jpg', true),
('Masala Dosa', 100.00, 9, 1, 'Breakfast', 'Crispy dosa with potato masala', 'masaladosa.jpg', true),

-- MX Group (id = 10)
('Tandoori Chicken', 300.00, 10, 0, 'Main Course', 'Char-grilled chicken with tandoori spices', 'tandoori.jpg', true),
('Butter Naan', 40.00, 10, 1, 'Bread', 'Soft naan coated with butter', 'naan.jpg', true),
('Chicken Biryani', 280.00, 10, 0, 'Rice', 'Fragrant rice layered with chicken masala', 'biryani.jpg', true);
