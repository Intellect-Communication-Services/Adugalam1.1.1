
  import "./Location.css";
  import { useNavigate } from "react-router-dom";
  import logo from "../images/image copy 3.png";
  import orange from "../images/image copy 4.png";
  import green from "../images/image copy 5.png";

  const Location = () => {


    const navigate=useNavigate();



   const GOOGLE_API_KEY = "AIzaSyARdifF99viSjpNlPjJMLHwo8Z8QtEiDP4";




 const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("LAT:", latitude, "LNG:", longitude);

        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        );

        const data = await res.json();
        console.log("ADDRESS:", data);
      },
      (error) => {
        console.error(error);
        alert("Location permission denied");
      }
    );
  };




   
    return (
      <div className="location">
        
             <div className="pick-location">
                <h1 className="back-btn" onClick={()=>navigate(-1)}>&lt;</h1>&nbsp;&nbsp;&nbsp;
                <h4>Pick Location</h4>
             </div>
             <div className="use-current-location" onClick={useCurrentLocation}>
                <img src={logo} alt="" className="use"/>
                <h4 className="current">Use Current Location</h4>
             </div>



             <div className="pick-location">
                
                <h5 className="popularrr">Popular Areas</h5>
             </div>
             <div className="all">
             <div className="use-current-location1">
                <img src={orange} alt="" className="use"/>
                <h4 className="current">Tuckerammalpuram</h4>
             </div>
             <div className="use-current-location1">
                <img src={orange} alt="" className="use"/>
                <h4 className="current">Palayamkottai</h4>
             </div>
             <div className="use-current-location1">
                <img src={orange} alt="" className="use"/>
                <h4 className="current">KTC Nagar</h4>
             </div>
             </div>




 <div className="pick-location">
                
                <h5 className="popularrr">Cities We Operate In</h5>
             </div>
             <div className="all">
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Tiruchi</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Pollachi</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Coimbatore</h4>
             </div>
              <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Hosur</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Dharmapuri</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Salem</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Erode</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Karur</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Thanjavur</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Chennai</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Thiruvallur</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Vellore</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Madurai</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Tiruppur</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Mettupalayam</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Chengalpattu</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Namakkal</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Tirunelveli</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Dindugal</h4>
             </div>
             <div className="use-current-location1">
                <img src={green} alt="" className="use"/>
                <h4 className="current">Theni</h4>
             </div>
             </div>





      </div>
    );
  };

  export default Location;