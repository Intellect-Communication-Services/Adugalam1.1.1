import "./Logout.css";
import "./Sidebar";
import { NavLink } from "react-router-dom";


function Logout() {
  return (
    
    <div className="main-content">
      <div className="header">
        <h1>Account Settings</h1>
      </div>
         <div className="sidebar">
        <h2>Adugalam</h2>
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

      <div className="card">
        <h2>Logout</h2>
        <p>Are you sure you want to logout from Adukalam?</p>

        <div className="btn-group">
          <button className="btn logout-btn">Logout</button>
        </div>

        <hr />

        <div className="delete-section">
          <h2 className="danger">Delete Account</h2>
          <p>
            This action is permanent. Please tell us why you want to delete your
            account.
          </p>

          <label>Reason for deleting account</label>
          <textarea placeholder="Enter your reason..."></textarea>

          <div className="btn-group">
            <button className="btn delete-btn">Request to Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
