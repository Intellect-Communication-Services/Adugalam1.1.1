import React, { useState, useEffect, useRef } from "react";
import "./Banner.css";

export default function Banner() {
  const slides = [
    {
      title: "Quick ground booking !",
      text: "Browse, book, and enjoy fun family moments.",
      btn: "Book now",
      img: "/banner4.jpg",
    },
    {
      title: "Sports Event Booking !",
      text: "Find and book your favorite events.",
      btn: "Explore",
      img: "/banner2.jpg",
    },
    {
      title: "Tournament Registration !",
      text: "Join and participate in tournaments.",
      btn: "Register",
      img: "/banner1.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const startX = useRef(0);

  /* Auto slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  /* Mouse drag */
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    const diff = startX.current - e.clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  /* Touch swipe */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  return (
    <div className="banner-wrapper">
      <div
        className="banner"
        style={{ backgroundImage: `url(${slides[index].img})` }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="banner-overlay">
          <div className="banner-content">
            <h2>{slides[index].title}</h2>
            <p>{slides[index].text}</p>
            <button>{slides[index].btn}</button>
          </div>
        </div>
      </div>

      {/* 🔘 Dots OUTSIDE banner */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}