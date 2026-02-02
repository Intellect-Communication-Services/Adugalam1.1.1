import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Adukalam</h2>

      <ul>
        <li>
          <NavLink to="/VendorDashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/addturf">Add Turf</NavLink>
        </li>

        <li>
          <NavLink to="/Scheduletime">Schedule Time</NavLink>
        </li>

        <li>
          <NavLink to="/discount">Discount</NavLink>
        </li>

        <li>
          <NavLink to="/VendorBookingManagement">Booking Management</NavLink>
        </li>

        <li>
          <NavLink to="/Vendorlogout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
