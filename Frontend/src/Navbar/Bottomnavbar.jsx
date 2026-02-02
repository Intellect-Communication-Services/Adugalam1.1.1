import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlay,
  FiCalendar,
  FiUser,
  FiSettings
} from "react-icons/fi";
import "./Bottomnavbar.css";

const Bottomnavbar = () => {
  return (
    <div className="bottom-navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FiHome />
      </NavLink>

      <NavLink
        to="/play"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FiPlay />
      </NavLink>

      <NavLink
        to="/book"
        className={({ isActive }) =>
          isActive
            ? "nav-item active active-center"
            : "nav-item active-center"
        }
      >
        <FiCalendar />
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FiUser />
      </NavLink>

      <NavLink
        to="/Settings"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FiSettings />
      </NavLink>
    </div>
  );
};

export default Bottomnavbar;
