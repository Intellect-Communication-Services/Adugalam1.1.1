import { useEffect, useState } from "react";
import "./BookingManagement.css";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/bookings`
      );
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  
  const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure to ${status} this booking?`)) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/bookings/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchBookings();
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-management">
      <h1>Booking Management</h1>
      <p className="subtitle">View and manage all turf bookings</p>

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Turf</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Game</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.bookingId}</td>
                <td>{b.userName}</td>
                <td>{b.turfName}</td>
                <td>{b.date}</td>
                <td>{b.timeSlot}</td>
                <td>{b.game}</td>
                <td>₹{b.amount}</td>
                <td>
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status !== "Cancelled" && (
                    <button
                      className="cancel"
                      disabled={loading}
                      onClick={() => updateStatus(b._id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  )}
                  <button className="view">View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
