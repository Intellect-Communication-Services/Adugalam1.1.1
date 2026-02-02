// src/ShopSports.jsx
import React from "react";
import { Tag, Truck, ShieldCheck, Star } from "lucide-react";

import "./ShopSports.css";
import { FiShoppingBag } from "react-icons/fi";


import {
  FootballIcon,
  CricketIcon,
  BadmintonIcon,
  BasketballIcon,
  SportswearIcon,
  FootwearIcon,
  AccessoriesIcon,
  FitnessIcon
} from "./Icons";  


const categories = [
  { name: "Football Gear", icon: <FootballIcon />, products: "500+ products" },
  { name: "Cricket Equipment", icon: <CricketIcon />, products: "800+ products" },
  { name: "Badminton Rackets", icon: <BadmintonIcon />, products: "300+ products" },
  { name: "Basketball", icon: <BasketballIcon />, products: "200+ products" },
  { name: "Sportswear", icon: <SportswearIcon />, products: "1000+ products" },
  { name: "Footwear", icon: <FootwearIcon />, products: "600+ products" },   
  { name: "Accessories", icon: <AccessoriesIcon />, products: "400+ products" },
  { name: "Fitness Equipment", icon: <FitnessIcon />, products: "350+ products" },
];


const ShopSports = () => {
  return (
    <div className="shop-page">
      
      
      <section className="hero">
        <p className="hero-tag">Shop Sports Essentials</p>
        <p className="hero-text">
                    Everything you need to play your best

          Quality sports equipment, apparel and accessories from top brands 
        </p>
        <div className="hero-buttons">
          <button className="btn-pr">Browse Store</button>
        </div>
      </section>

      <section className="section category-section">
        <h2 className="section-title">Shop by Category</h2>

        <div className="category-grid">
          {categories.map((item, index) => (
            <div className="category-card" key={index}>
              <div className="category-icon">{item.icon}</div>
              <p>{item.name}</p>
              <div className="category-product">
              <p>{item.products}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
       <section className="section features">
      <div className="feature">
        <div className="icon">
          <Tag size={40} />
        </div>
        <h3>Best Prices</h3>
        <p>Competitive pricing with exclusive member discounts.</p>
      </div>

      <div className="feature">
        <div className="icon">
          <Truck size={40} />
        </div>
        <h3>Fast Delivery</h3>
        <p>Quick delivery across Tamil Nadu with tracking.</p>
      </div>

      <div className="feature">
        <div className="icon">
          <ShieldCheck size={40} />
        </div>
        <h3>Genuine Products</h3>
        <p>100% authentic products from authorized .</p>
        <p>dealers</p>
      </div>

      <div className="feature">
        <div className="icon">
          <Star size={40} />
        </div>
        <h3>Player Reviews</h3>
        <p>Real reviews from verified players in our community.</p>
      </div>
    </section>

      <section className="section coming-soon">
  <div className="coming-icon">
    <FiShoppingBag class="coming"/>
  </div>

  <h3>Marketplace Coming Soon</h3>

  <p>
    We're building a comprehensive sports marketplace where you can buy
    equipment, rent gear, and even sell your used sports items. Stay tuned!
  </p>

  <button className="btn-outline">Get Early Access</button>
</section>
      
      <section className="section retailer-cta">
        <h2>Are You a Sports Retailer?</h2>
        <p>Partner with Adusports to expand your reach.</p>
        <button className="btn-primary">Become a Seller</button>
      </section>

      
      
    </div>
  );
};

export default ShopSports;
