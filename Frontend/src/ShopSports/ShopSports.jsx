import React from "react";
import "./ShopSports.css";
import { FiShoppingBag } from "react-icons/fi";

/* ================= ICON IMAGES ================= */

import FootballIcon from "../images/Foot Ball icon_Adugalam_Sports booking app.png";
import CricketIcon from "../images/Cricket icon_Adugalam_Sports booking app.png";
import BadmintonIcon from "../images/Badminton 1 icon_Adugalam_Sports booking app.png";
import BasketballIcon from "/Swimming.png";
import sportswearIcon from "../assets/sportswear.png";
import footwearIcon from "../assets/footwear.png";
import accessoriesIcon from "../assets/accessories.png";
import fitnessIcon from "../assets/fitness.png";


import Banner from "../Components/Banner/Banner.jsx";

import { useState,useEffect } from "react";
import Loader from "../Loader.jsx";

/* ================= DATA ================= */

const categories = [
  { name: "Football Gear", icon: FootballIcon, products: "500+ products" },
  { name: "Cricket Equipment", icon: CricketIcon, products: "800+ products" },
  { name: "Badminton Rackets", icon: BadmintonIcon, products: "300+ products" },
  { name: "Swimming", icon: BasketballIcon, products: "200+ products" },
  { name: "Sportswear", icon: sportswearIcon, products: "1000+ products" },
  { name: "Footwear", icon: footwearIcon, products: "600+ products" },
  { name: "Accessories", icon: accessoriesIcon, products: "400+ products" },
  { name: "Fitness Equipment", icon: fitnessIcon, products: "350+ products" },
];

/* ================= COMPONENT ================= */

const ShopSports = () => {



const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }



  return (
    <div className="shop-page1">
      <br></br>
      <br></br>
    <Banner/>

      {/* Hero */}
      <section className="shop-hero1">
        <p className="shop-hero-tag1">Shop Sports Essentials</p>
        <p className="shop-hero-text1">
          Everything you need to play your best.
        </p>
        <button className="shop-btn-pr1">Browse Store</button>
      </section>

      {/* Categories */}
      <section className="category-section1">
        <h2 className="shop-section-title1">Shop by Category</h2>
        <p className="apples"> Browse by Category</p>

        <div className="shop-category-grid1">
          {categories.map((item, index) => (
            <div className="shop-category-card1" key={index}>
              <img
                src={item.icon}
                alt={item.name}
                className="shop-category-icon1"
              />
              <p>{item.name}</p>
              <p>{item.products}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
              <h2 className="shop-section-title1 bowl">Features</h2>
              <p className="apples5">Store Characteristics</p>

      <section className="features-section1">
        
        <div className="feature-item1">
          <div className="feature-icon1">🏷️</div>
          <h4>Best Prices</h4>
          <p>Competitive pricing with exclusive member discounts</p>
        </div>

        <div className="feature-item1">
          <div className="feature-icon1">🚚</div>
          <h4>Fast Delivery</h4>
          <p>Quick delivery across Tamil Nadu with tracking</p>
        </div>

        <div className="feature-item1">
          <div className="feature-icon1">🛡️</div>
          <h4>Genuine Products</h4>
          <p>100% authentic products from authorized dealers</p>
        </div>

        <div className="feature-item1">
          <div className="feature-icon1">⭐</div>
          <h4>Player Reviews</h4>
          <p>Real reviews from verified players in our community</p>
        </div>
      </section>

      {/* Marketplace Coming Soon */}
      <section className="marketplace-wrapper1">
        <div className="marketplace-card1">
          <FiShoppingBag size={40} className="marketplace-icon1" />
          <h3>Marketplace Coming Soon</h3>
          <p>
            We're building a comprehensive sports marketplace where you can buy
            equipment, rent gear, and even sell your used sports items.
          </p>
          <button className="marketplace-btn1">Get Early Access</button>
        </div>
      </section>

      {/* Retailer CTA */}
      <section className="retailer-section1">
        <h2>Are You a Sports Retailer?</h2>
        <p>
          Partner with Adugalam to reach thousands of sports enthusiasts across
          Tamil Nadu.
        </p>
        <button className="retailer-btn1">Become a Seller</button>
      </section>

    </div>
  );
};

export default ShopSports;