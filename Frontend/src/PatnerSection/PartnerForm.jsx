import "./PartnerForm.css";
import React, { useState, useRef } from "react";
import {
  GoogleMap,
  Rectangle,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";


import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
  marginTop: "10px",
};


const defaultCenter = { lat: 13.0827, lng: 80.2707 };

const PartnerForm = () => {

  const navigate=useNavigate();


const searchBoxRef = useRef(null);





const onSearchLoad = (ref) => {
  searchBoxRef.current = ref;
};

const onPlacesChanged = () => {
 const places = searchBoxRef.current?.getPlaces();

  if (!places || places.length === 0) return;

  const place = places[0];
  if (!place.geometry?.location) return;

  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();

  const newCenter = { lat, lng };

  mapRef.current?.panTo(newCenter);
  mapRef.current?.setZoom(16);
  setCenter(newCenter);

  const offset = 0.002;
  const newBounds = {
    north: lat + offset,
    south: lat - offset,
    east: lng + offset,
    west: lng - offset,
  };

  setRectangleBounds(newBounds);

  updateForm({
    ...form,
    location: place.formatted_address || place.name,
    latitude: lat.toFixed(6),
    longitude: lng.toFixed(6),
    bounds: newBounds,
  });
};



  const LOCATIONS = {
  Tirunelveli: { lat: 8.7139, lng: 77.7567 },
  Kanniyakumari: { lat: 8.0883, lng: 77.5385 },
  Virudhunagar: { lat: 9.5851, lng: 77.9575 },
  Tenkasi: { lat: 8.9591, lng: 77.3152 },
  Thoothukudi: { lat: 8.7642, lng: 78.1348 },
};




 const [form, setForm] = useState(() => {
  const saved = sessionStorage.getItem("partnerForm");

  return saved
    ? JSON.parse(saved)
    : {
  venuename: "",
  ownername: "",
  email: "",
  phone: "",
  Avaliablegames: [],
  location: "",
  latitude: "",
  longitude: "",
  bounds: null,
  totalturf: "", // ✅ ADD THIS
};

});




useEffect(() => {
  if (!form.latitude || !form.longitude) return;

  const lat = parseFloat(form.latitude);
  const lng = parseFloat(form.longitude);

  // ⛔ Only update if center actually changed
  if (
    Math.abs(center.lat - lat) < 0.0001 &&
    Math.abs(center.lng - lng) < 0.0001
  ) return;

  setCenter({ lat, lng });

  if (form.bounds) {
    setRectangleBounds(form.bounds);
  }
}, [form.latitude, form.longitude]);






 const updateForm = (updatedForm) => {
  setForm(updatedForm);
  sessionStorage.setItem("partnerForm", JSON.stringify(updatedForm));
};






const [policies, setPolicies] = useState(() => {
  const saved = sessionStorage.getItem("partnerPolicies");
  return saved
    ? JSON.parse(saved)
    : { terms: false, privacy: false, turf: false };
});




const handlePolicyChange = (e) => {
  const { name, checked } = e.target;

  const updated = { ...policies, [name]: checked };

  setPolicies(updated);
  sessionStorage.setItem("partnerPolicies", JSON.stringify(updated));
};





  const gamesList = ["Cricket", "Football", "Badminton", "Tennis"];

  const mapRef = useRef(null);
  const rectangleRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

 



  const [center, setCenter] = useState(defaultCenter);

  const [rectangleBounds, setRectangleBounds] = useState({
    north: 8.7189,
    south: 8.7089,
    east: 77.7130,
    west: 77.7030,
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  updateForm({ ...form, [name]: value });
};



 const handleGameChange = (e) => {
  const { value, checked } = e.target;

  const updatedGames = checked
    ? [...form.Avaliablegames, value]
    : form.Avaliablegames.filter((g) => g !== value);

  updateForm({
    ...form,
    Avaliablegames: updatedGames,
  });
};


  const onMapLoad = (map) => (mapRef.current = map);
  const onAutoCompleteLoad = (auto) => (autocompleteRef.current = auto);

 const onPlaceChanged = () => {
  const auto = autocompleteRef.current;
  const map = mapRef.current;

  if (!auto || !map) return;

  const place = auto.getPlace();
  if (!place?.geometry?.location) return;

  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();

  const newCenter = { lat, lng };

  // 🔥 HARD sync map
  map.panTo(newCenter);
  map.setZoom(16);
  setCenter(newCenter);

  const offset = 0.002;
  const newBounds = {
    north: lat + offset,
    south: lat - offset,
    east: lng + offset,
    west: lng - offset,
  };

  setRectangleBounds(newBounds);

  updateForm({
    ...form,
    location: place.formatted_address || place.name,
    latitude: lat.toFixed(6),
    longitude: lng.toFixed(6),
    bounds: newBounds,
  });
};

  const onRectangleLoad = (rect) => (rectangleRef.current = rect);

  const onBoundsChanged = () => {
  if (!rectangleRef.current) return;

  const b = rectangleRef.current.getBounds();
  if (!b) return;

  const newBounds = {
    north: b.getNorthEast().lat(),
    south: b.getSouthWest().lat(),
    east: b.getNorthEast().lng(),
    west: b.getSouthWest().lng(),
  };

  // ⛔ Prevent infinite updates
  if (
    JSON.stringify(newBounds) === JSON.stringify(rectangleBounds)
  ) return;

  const centerLat =
    (newBounds.north + newBounds.south) / 2;
  const centerLng =
    (newBounds.east + newBounds.west) / 2;

  setRectangleBounds(newBounds);
  updateForm({
  ...form,
  latitude: centerLat.toFixed(6),
  longitude: centerLng.toFixed(6),
  bounds: newBounds,
});

};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL FORM DATA 👉", form);
    alert("Submitted (check console)");


sessionStorage.removeItem("partnerForm");
sessionStorage.removeItem("partnerPolicies");



  };

  if (!isLoaded) return <p>Loading map...</p>;





const handleMapClick = (e) => {
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();

  setCenter({ lat, lng });

  const offset = 0.002;
  const newBounds = {
    north: lat + offset,
    south: lat - offset,
    east: lng + offset,
    west: lng - offset,
  };

  setRectangleBounds(newBounds);

 updateForm({
  ...form,
  latitude: lat.toFixed(6),
  longitude: lng.toFixed(6),
  bounds: newBounds,
});

};







const handleLocationSelect = (e) => {
  const locationName = e.target.value;
  if (!locationName) return;

  const coords = LOCATIONS[locationName];
  if (!coords) return;

  const { lat, lng } = coords;

  const offset = 0.05;
  const newBounds = {
    north: lat + offset,
    south: lat - offset,
    east: lng + offset,
    west: lng - offset,
  };

  setCenter({ lat, lng });
  setRectangleBounds(newBounds);

  updateForm({
    ...form,
    location: locationName,
    latitude: lat.toFixed(6),   // ✅ ADD
    longitude: lng.toFixed(6),  // ✅ ADD
    bounds: newBounds,
  });

  mapRef.current?.panTo({ lat, lng });
  mapRef.current?.setZoom(12);
};








  return (
    <div className="partner-wrapper">
      <div className="Partner-Form">
        <h3 className="Partner-header">Create Your Digital Sports in 1-Min</h3>

        <form className="Patner-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Venue Name</label>
            <input name="venuename" value={form.venuename} onChange={handleChange} placeholder="Enter venue name"  required />
          </div>

          <div className="form-group">
            <label>Owner Name</label>
            <input name="ownername" value={form.ownername} onChange={handleChange} placeholder="Enter name" required/>
          </div>

          <div className="form-group">
            <label>Email</label>
<input
  name="email"
  type="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Enter email"
  required
/>
          </div>

          <div className="form-group">
  <label>Phone</label>
  <input
    name="phone"
    type="tel"
    value={form.phone}
    onChange={(e) => {
      // allow only numbers
      const value = e.target.value.replace(/\D/g, "");
      updateForm({ ...form, phone: value });
    }}
    placeholder="Enter phone number"
    pattern="[6-9]{1}[0-9]{9}"
    maxLength={10}
    required
  />
</div>


          {/* AVAILABLE GAMES */}
          <div className="form-group full">
            <label>Available Games</label>
            <div className="checkbox-group">
              {gamesList.map((g) => (
                <label key={g} className="checkbox-card">
  <input
    type="checkbox"
    value={g}
    checked={form.Avaliablegames.includes(g)}
    onChange={handleGameChange}
    
  />
  <span className="checkbox-text">{g}</span>
</label>


              ))}
            </div>
          </div>

          {/* LOCATION + MAP */}
          <div className="form-group full">
            <label>Search Location</label>
           
          <select
  name="location"
  value={form.location}
  onChange={handleLocationSelect}
  required
>

  <option value="">Search place…</option>
  <option value="Tirunelveli">Tirunelveli</option>
  <option value="Kanniyakumari">Kanniyakumari</option>
  <option value="Virudhunagar">Virudhunagar</option>
  <option value="Tenkasi">Tenkasi</option>
  <option value="Thoothukudi">Thoothukudi</option>
</select>


          <GoogleMap
  mapContainerStyle={containerStyle}
  center={center}
  zoom={15}
  onLoad={onMapLoad}
  onClick={handleMapClick}
  required
>


  <Rectangle
    bounds={rectangleBounds}
    editable
    draggable
    onLoad={onRectangleLoad}
    onBoundsChanged={onBoundsChanged}
  />
</GoogleMap>



          </div>

          <div className="form-group">
            <label>Latitude</label>
            <input value={form.latitude} readOnly required/>
          </div>

          <div className="form-group">
            <label>Longitude</label>
            <input value={form.longitude} readOnly required/>
          </div>


<div className="form-group">
  <label>Total turf</label>
  <select
    name="totalturf"
    value={String(form.totalturf || "")}
    onChange={handleChange}
    required
  >
    <option value="">Choose...</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
  </select>
</div>








{/* POLICIES */}
<div className="form-group full policy-box">
  <label className="policy-item">
    <input
      type="checkbox"
      name="terms"
      checked={policies.terms}
      onChange={handlePolicyChange}
      required
    />
    <span>
      I agree to the{" "}
      <span
  className="policy-link"
  onClick={(e) => {
    e.stopPropagation(); // prevent checkbox toggle
    navigate("/Terms");
  }}
>
  Terms & Conditions
</span>

    </span>
  </label>

  <label className="policy-item">
    <input
      type="checkbox"
      name="privacy"
      checked={policies.privacy}
      onChange={handlePolicyChange}
      required
      
    />
    <span className="hello">
      I agree to the{" "}
     <span
  className="policy-link"
  onClick={(e) => {
    e.stopPropagation(); // prevent checkbox toggle
    navigate("/privacy");
  }}
>
  Privacy Policy
</span>
    </span>
  </label>

  <label className="policy-item">
    <input
      type="checkbox"
      name="turf"
      checked={policies.turf}
      onChange={handlePolicyChange}
      required
    />
    <span>
      I agree to the{" "}
     <span
  className="policy-link"
  onClick={(e) => {
    e.stopPropagation(); // prevent checkbox toggle
    navigate("/clubpolicy");
  }}
>
  Turf Policy
</span>
    </span>
  </label>
</div>




        <button
  className="submit-btn"
  disabled={!(policies.terms && policies.privacy && policies.turf)}
>
  Submit
</button>

          
        </form>

      </div>
    </div>
  );
};

export default PartnerForm;