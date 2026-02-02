import "./PartnerForm.css";
import React, { useState, useRef } from "react";
import {
  GoogleMap,
  Rectangle,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
  marginTop: "10px",
};

const defaultCenter = { lat: 13.0827, lng: 80.2707 };

const PartnerForm = () => {
  const gamesList = ["Cricket", "Football", "Badminton", "Tennis"];

  const mapRef = useRef(null);
  const rectangleRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
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
    bounds: null,
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
    setForm({ ...form, [name]: value });
  };

  const handleGameChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      Avaliablegames: checked
        ? [...prev.Avaliablegames, value]
        : prev.Avaliablegames.filter((g) => g !== value),
    }));
  };

  const onMapLoad = (map) => (mapRef.current = map);
  const onAutoCompleteLoad = (auto) => (autocompleteRef.current = auto);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place?.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setCenter({ lat, lng });
    mapRef.current.panTo({ lat, lng });

    const offset = 0.002;
    const newBounds = {
      north: lat + offset,
      south: lat - offset,
      east: lng + offset,
      west: lng - offset,
    };

    setRectangleBounds(newBounds);
    setForm((p) => ({
      ...p,
      location: place.formatted_address,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
      bounds: newBounds,
    }));
  };

  const onRectangleLoad = (rect) => (rectangleRef.current = rect);

  const onBoundsChanged = () => {
    if (!rectangleRef.current) return;
    const b = rectangleRef.current.getBounds();
    if (!b) return;

    const centerLat =
      (b.getNorthEast().lat() + b.getSouthWest().lat()) / 2;
    const centerLng =
      (b.getNorthEast().lng() + b.getSouthWest().lng()) / 2;

    const newBounds = {
      north: b.getNorthEast().lat(),
      south: b.getSouthWest().lat(),
      east: b.getNorthEast().lng(),
      west: b.getSouthWest().lng(),
    };

    setRectangleBounds(newBounds);
    setForm((p) => ({
      ...p,
      latitude: centerLat.toFixed(6),
      longitude: centerLng.toFixed(6),
      bounds: newBounds,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL FORM DATA 👉", form);
    alert("Submitted (check console)");
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="partner-wrapper">
      <div className="Partner-Form">
        <h3 className="Partner-header">🏟️ Turf Form</h3>

        <form className="Patner-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Venue Name</label>
            <input name="venuename" value={form.venuename} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Owner Name</label>
            <input name="ownername" value={form.ownername} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
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
            <Autocomplete onLoad={onAutoCompleteLoad} onPlaceChanged={onPlaceChanged}>
              <input placeholder="Search place…" />
            </Autocomplete>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={onMapLoad}
            >
              <Rectangle
                bounds={rectangleBounds}
                editable
                draggable
                onLoad={onRectangleLoad}
                onBoundsChanged={onBoundsChanged}
                options={{
                  fillColor: "#667eea",
                  fillOpacity: 0.25,
                  strokeColor: "#667eea",
                  strokeWeight: 2,
                }}
              />
            </GoogleMap>
          </div>

          <div className="form-group">
            <label>Latitude</label>
            <input value={form.latitude} readOnly />
          </div>

          <div className="form-group">
            <label>Longitude</label>
            <input value={form.longitude} readOnly />
          </div>

          <button className="submit-btn">🚀 Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;