import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

import Location from "../images/image copy 2.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChange", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChange", syncAuth);
    };
  }, []);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-container">

          {/* ☰ MENU */}
          <button className="menu-toggle" onClick={() => setOpen(true)}>
            <FiMenu size={22} />
          </button>

          {/* LOGO */}
          <NavLink to="/" className="navbar-logo">
            Adugalam
          </NavLink>

          {/* LOCATION */}
          <NavLink to="/location" className="loca">
            <img src={Location} alt="" className="local" />
            &nbsp; Tirunelveli
          </NavLink>

          {/* 👤 MOBILE PROFILE */}
          <div className="mobile-profile-right">
            {isAuth && (
              <NavLink to="/profile" className="mobile-profile">
                <CgProfile size={20} />
              </NavLink>
            )}
          </div>

          {/* -------- DESKTOP MENU -------- */}
          <nav className="navbar-menu">
            <NavLink to="/">Home</NavLink>

            {isAuth && (
              <>
                <NavLink to="/play">Play</NavLink>
                <NavLink to="/Bookhome">Book</NavLink>
                <NavLink to="/train">Train</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/tournaments">Tournaments</NavLink>
                <NavLink to="/events">Events</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </>
            )}
          </nav>

          {/* -------- ACTIONS -------- */}
          <div className="navbar-actions">
            <NavLink to="/download" className="btn-outline">
              Download App
            </NavLink>

            <NavLink to="/partner" className="btn-primary">
              Partner With Us
            </NavLink>

            {!isAuth && (
              <NavLink to="/login" className="btn-primary">
                Login
              </NavLink>
            )}

            {isAuth && (
              <NavLink to="/profile" className="profile-icon">
                <CgProfile size={28} />
              </NavLink>
            )}
          </div>
        </div>

        <div className="navbar-shadow" />
      </header>

      {/* ================= SIDEBAR ================= */}
      {open && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={`mobile-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">Adugalam</span>

          <button className="sidebar-close" onClick={closeSidebar}>
            <FiX size={22} />
          </button>
        </div>

        <nav className="sidebar-links">
          <NavLink to="/" onClick={closeSidebar}>Home</NavLink>

          {isAuth && (
            <>
              <NavLink to="/play" onClick={closeSidebar}>Play</NavLink>
              <NavLink to="/Bookhome" onClick={closeSidebar}>Book</NavLink>
              <NavLink to="/train" onClick={closeSidebar}>Train</NavLink>
              <NavLink to="/shop" onClick={closeSidebar}>Shop</NavLink>
              <NavLink to="/tournaments" onClick={closeSidebar}>Tournaments</NavLink>
              <NavLink to="/events" onClick={closeSidebar}>Events</NavLink>
              <NavLink to="/about" onClick={closeSidebar}>About</NavLink>
              <NavLink to="/contact" onClick={closeSidebar}>Contact</NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
