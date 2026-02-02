import React from "react";
import {
  FiUser,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import "./Train.css";


import Banner from "../Components/Banner/Banner.jsx";

import { useState,useEffect } from "react";
import Badminton from "../Badminton.jsx";


const trainingOptions = [
  {
    icon: <FiUser />,
    title: "Personal Coaching",
    desc: "One-on-one sessions with certified coaches tailored to your skill level",
    price: "From ₹800/session",
  },
  {
    icon: <FiUsers />,
    title: "Group Training",
    desc: "Learn with peers in small groups for cost-effective skill development",
    price: "From ₹300/session",
  },
  {
    icon: <FiBookOpen />,
    title: "Academy Programs",
    desc: "Structured long-term programs for serious athletes and aspiring professionals",
    price: "Monthly packages",
  },
  {
    icon: <FiCalendar />,
    title: "Camps & Clinics",
    desc: "Intensive short-term programs during holidays and weekends",
    price: "Special pricing",
  },
];

const sports = [
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
  "Volleyball",
  "Table Tennis",
  "Swimming",
  "Athletics",
  "Kabaddi",
];

const Train = () => {



const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Badminton />;
  }



  return (
    <main className="train-page">
      <br></br>
    <br></br>
    <Banner/>
      {/* HERO */}
      <section className="train-hero">
        <h1>Train with the Best</h1>
        <p>
          Find certified coaches and academies across Tamil Nadu. From beginners
          to professionals, we have training programs for every level.
        </p>

        <div className="hero-buttons5">
          <button className="btn-primary5">Find a Coach</button>
          <button className="btn-outline5">Browse Academies</button>
        </div>
      </section>

      {/* TRAINING OPTIONS */}
      <section className="training-options">
        <h2>Training Options</h2>
        
        <p>Training Alternatives</p>
        

        <div className="options-grid">
          {trainingOptions.map((item, index) => (
            <div className="option-card" key={index}>
              <div className="option-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="price">{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPORTS */}
      <section className="sports-section">
        <h2>Sports We Cover</h2>
        <p>Athletic Disciplines We Address</p>

        <div className="sports-tags">
          {sports.map((sport, index) => (
            <span key={index} className="sport-tag">
              {sport}
            </span>
          ))}
        </div>
      </section>

      {/* TRUST FEATURES */}
      <section className="trust-section">
        <div className="trust-item">
          <FiCheckCircle />
          <h4>Verified Coaches</h4>
          <p>All coaches are verified with certifications and background checks</p>
        </div>

        <div className="trust-item">
          <FiClock />
          <h4>Flexible Scheduling</h4>
          <p>Book sessions at times that work best for you</p>
        </div>

        <div className="trust-item">
          <FiMapPin />
          <h4>Multiple Locations</h4>
          <p>Training available at venues across Tamil Nadu</p>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="coming-soon">
        <h2>Training Marketplace Coming Soon</h2>
        <p>
          We're building a comprehensive coaching marketplace. Register your
          interest to be notified when it launches!
        </p>
        <button className="btn-light">Get Notified</button>
      </section>
    </main>
  );
};

export default Train;