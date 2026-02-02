import Sidebar from "../Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "./vendorLayout.css";

const VendorLayout = () => {
  return (
    <div className="vendor-layout">
      <Sidebar />
      <div className="vendor-content">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
