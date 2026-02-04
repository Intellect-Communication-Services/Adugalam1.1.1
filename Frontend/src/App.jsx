
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";



import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import Tvl from "./Tvl/Tvl.jsx";
import Hit from "./Tvl/Hit.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import Login from "./Login/Login.jsx";
import SignUp from "./Login/SignUp.jsx";
import ProtectedRoute from "./Login/ProtectedRoute.jsx";
import Book from "./Book/Book.jsx";
import Play from "./Play/Play.jsx";
import Train from "./Train/Train.jsx";
import Profile from "./Profile/Profile.jsx";
import MyProfile from "./Profile/MyProfile.jsx";
import ProfileHistory from "./Profile/History.jsx";
import Events from "./Events/Events.jsx"; 
import ShopSports from "./ShopSports/ShopSports.jsx";
import { Tournments } from "./Tournments/Tournments.jsx";
import About from "./About/About.jsx";
import Contact from "./Contact/Contact.jsx";
import PatnerSection from "./PatnerSection/PatnerSection.jsx";
import EditProfile from "./Profile/EditProfile.jsx";
import Settings from "./Settings/Settings.jsx";
import ChangePassword from "./Settings/ChangePassword.jsx";
import Terms from "./Settings/Terms.jsx";
import Privacy from "./Settings/Privacy.jsx";
import PartnerForm from "./PatnerSection/PartnerForm.jsx";

// import Delete from "./Settings/Delete.jsx";


import Dashboard from "./Admin/Dashboard.jsx";
import AdminSettings from "./Admin/AdminSettings.jsx";
import Bookingmanagement from "./Admin/BookingManagement1.jsx";
import Chart from "./Admin/Chart.jsx";
import PaymentsReport from "./Admin/PaymentsReport.jsx";
import Sidebar from "./Admin/Sidebar.jsx";
import TurfManagement from "./Admin/TurfManagement.jsx";
import UserManagement from "./Admin/UserManagement.jsx";
import Vendor from "./Admin/Vender.jsx";
import VendorLogin from "./Vendor/VendorLogin/VendorLogin.jsx";
import VendorSignup from "./Vendor/VendorLogin/VendorSignup.jsx";
import AdminLogin from "./Admin/AdminLogin/AdminLogin.jsx";
import AdminSignup from "./Admin/AdminLogin/AdminSignup.jsx";
import AddVendor from "./Admin/AddVendor/AddVendor.jsx";


import Addturf from "./Vendor/AddTurf.jsx";
import Discount from "./Vendor/DiscountPage.jsx";
import VendorBookingManagement from "./Vendor/BookingManagement.jsx";
import VendorDashboard from "./Vendor/Dashboard.jsx";
import Vendorlogout from "./Vendor/Logout.jsx";
import Scheduletime from "./Vendor/ScheduleTime.jsx";
import Vendorsidebar from "./Vendor/Sidebar.jsx";
import VendorLayout from "./Vendor/layouts/VendorLayout.jsx";


import Galarypage from "./Book/Galarypage.jsx";
import BookingGround from "./Book/BookingGround.jsx";
import Card from "./Book/Cartpage.jsx";
import Payment from "./Book/PaymentPage";
import Bookhome from "./Book/Bookhome.jsx";
import Summary from "./Book/Summary.jsx";
import Mybooking from "./Book/MyBooking.jsx";
import Newonadugalam from "./Components/Newonadugalam/Newonadugalam.jsx";
import Tennis from "./Book/Tennis.jsx";
import AllCategories from "./AllCategories/AllCategories.jsx";
import Myfavourite from "./Profile/Myfavourite.jsx";
import Myreviews from "./Profile/Myreviews.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import { HiH1 } from "react-icons/hi2";



import Bottomnavbar from "./Bottomnavbar/Bottomnavbar.jsx";
import Location from "./Location/Location.jsx";
import ForgotPassword from "./Login/ForgotPassword.jsx";


const FooterWrapper = () => {
  const location = useLocation();

  const hideFooterRoutes = ["/cart", "/payment","/Vendorsidebar","/location"];

  if (hideFooterRoutes.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
};






const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/VendorLogin" element={<VendorLogin />} />
        <Route path="/VendorSignup" element={<VendorSignup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminSignup" element={<AdminSignup />} />


        {/* PROTECTED */}
        <Route path="/book" element={<Book />} /> 
        <Route path="/play" element={<Play />} />
        <Route path="/train" element={<Train />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/profilehistory" element={<ProfileHistory/>}></Route>
        <Route path="/hit" element={<Hit/>}></Route>
        <Route path="/tvl" element={<Tvl/>}></Route>
        <Route path="/events" element={<Events />} />
        <Route path="/shop" element={<ShopSports />} />
        <Route path="/tournaments" element={<Tournments />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partner" element={<PatnerSection />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Settings" element={<Settings/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
        <Route path="/Terms" element={<Terms/>} />
        <Route path="/Privacy" element={<Privacy/>} />
        {/* <Route path="/Delete" element={<Delete/>} /> */}
          <Route path="/Dashboard" element={<Dashboard  />}></Route>
          <Route path="/AdminSettings" element={<AdminSettings  />}></Route>
          <Route path="/BookingManagement" element={<Bookingmanagement  />}></Route>
          <Route path="/Chart" element={<Chart  />}></Route>
          <Route path="/PaymentsReport" element={<PaymentsReport  />}></Route>
          <Route path="/Sidebar" element={<Sidebar  />}></Route>
          <Route path="/TurfManagement" element={<TurfManagement  />}></Route>
          <Route path="/AddVendor" element={<AddVendor  />}></Route>
          <Route path="/UserManagement" element={<UserManagement  />}></Route>
          <Route path="/Vendor" element={<Vendor  />}></Route>




        <Route element={<VendorLayout />}>
        <Route path="/VendorDashboard" element={<VendorDashboard />} />
        <Route path="/addturf" element={<Addturf />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/VendorBookingManagement" element={<VendorBookingManagement />} />
        <Route path="/VendorLogout" element={<Vendorlogout/>}></Route>
        <Route path="/Scheduletime" element={<Scheduletime/>}></Route>
      </Route>

        <Route path="/galary" element={<Galarypage/>}></Route>
        <Route path="/bookingground" element={<BookingGround/>}></Route>
        <Route path="/cart" element={<Card/>}></Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="/Bookhome" element={<Bookhome/>}></Route>
        <Route path="/summary" element={<Summary/>}></Route>
        <Route path="/mybooking" element={<Mybooking/>}></Route>
        <Route path="/partnerform" element={<PartnerForm/>}></Route>
        <Route path="/newonadugalam" element={<Newonadugalam/>}></Route>
        <Route path="/tennis" element={<Tennis/>}></Route>
        <Route path="/allcategories" element={<AllCategories/>}></Route>
        <Route path="/myfavourite" element={<Myfavourite/>}></Route>
        <Route path="/myreviews" element={<Myreviews/>}/>
        <Route path="/download" element={ <h1>Coming Soon</h1> }></Route>
        <Route path="/VendorLayout" element={<VendorLayout/>}></Route>
        <Route path="/location" element={<Location/>}></Route>
        <Route path="/Bottomnavbar" element={<Bottomnavbar/>}></Route>

<Route path="/forgot-password" element={<ForgotPassword />} />


      </Routes>

<FooterWrapper/>    
</Router>
  );
};

export default App;
