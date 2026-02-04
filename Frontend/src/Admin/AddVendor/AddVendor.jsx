import "./AddVendor.css";
import React, { useState, useRef } from "react";
import { GoogleMap, Rectangle, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
  marginTop: "10px",
};

const defaultCenter = { lat: 13.0827, lng: 80.2707 };

const LOCATIONS = {
  Tirunelveli: { lat: 8.7139, lng: 77.7567 },
  Kanniyakumari: { lat: 8.0883, lng: 77.5385 },
  Virudhunagar: { lat: 9.5851, lng: 77.9575 },
  Tenkasi: { lat: 8.9591, lng: 77.3152 },
  Thoothukudi: { lat: 8.7642, lng: 78.1348 },
};

const AddVendor = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const rectangleRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  const [center, setCenter] = useState(defaultCenter);

  const [rectangleBounds, setRectangleBounds] = useState({
    north: 13.085,
    south: 13.080,
    east: 80.275,
    west: 80.265,
  });

  const [form, setForm] = useState({
    venuename: "",
    ownername: "",
    email: "",
    phone: "",
    Avaliablegames: [],
    location: "",
    latitude: "",
    longitude: "",
    totalturf: "",
  });

  const gamesList = ["Cricket", "Football", "Badminton", "Tennis"];

  const updateForm = (updated) => setForm(updated);

  const handleChange = (e) => {
    updateForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGameChange = (e) => {
    const { value, checked } = e.target;

    const games = checked
      ? [...form.Avaliablegames, value]
      : form.Avaliablegames.filter((g) => g !== value);

    updateForm({ ...form, Avaliablegames: games });
  };

  const onMapLoad = (map) => (mapRef.current = map);
  const onRectangleLoad = (rect) => (rectangleRef.current = rect);

  const onBoundsChanged = () => {
    if (!rectangleRef.current) return;

    const b = rectangleRef.current.getBounds();
    if (!b) return;

    const lat = (b.getNorthEast().lat() + b.getSouthWest().lat()) / 2;
    const lng = (b.getNorthEast().lng() + b.getSouthWest().lng()) / 2;

    updateForm({
      ...form,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setCenter({ lat, lng });

    updateForm({
      ...form,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    });
  };

  const handleLocationSelect = (e) => {
    const loc = e.target.value;
    if (!loc) return;

    const coords = LOCATIONS[loc];
    setCenter(coords);

    updateForm({
      ...form,
      location: loc,
      latitude: coords.lat.toFixed(6),
      longitude: coords.lng.toFixed(6),
    });

    mapRef.current?.panTo(coords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Vendor Added");
    navigate("/vendors");
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="vendor-page">
      <div className="vendor-card">
        <h3 className="vendor-title">Create Vendor</h3>

        <form className="vendor-form-grid" onSubmit={handleSubmit}>
          <div className="vendor-field">
            <label>Venue Name</label>
            <input name="venuename" value={form.venuename} onChange={handleChange} required />
          </div>

          <div className="vendor-field">
            <label>Owner Name</label>
            <input name="ownername" value={form.ownername} onChange={handleChange} required />
          </div>

          <div className="vendor-field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="vendor-field">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="vendor-field full">
            <label>Available Games</label>
            <div className="games-wrapper">
              {gamesList.map((g) => (
                <label key={g} className="game-chip">
                  <input
                    type="checkbox"
                    value={g}
                    checked={form.Avaliablegames.includes(g)}
                    onChange={handleGameChange}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="vendor-field full">
            <label>Select Location</label>
            <select onChange={handleLocationSelect}>
              <option value="">Select</option>
              {Object.keys(LOCATIONS).map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={onMapLoad}
              onClick={handleMapClick}
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

          <div className="vendor-field">
            <label>Latitude</label>
            <input value={form.latitude} readOnly />
          </div>

          <div className="vendor-field">
            <label>Longitude</label>
            <input value={form.longitude} readOnly />
          </div>

          <div className="vendor-field">
            <label>Total Turf</label>
            <select name="totalturf" value={form.totalturf} onChange={handleChange} required>
              <option value="">Select</option>
              {[1,2,3,4,5].map(n => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <button className="vendor-submit-btn">Submit Vendor</button>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
