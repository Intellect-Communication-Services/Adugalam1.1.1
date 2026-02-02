import { useEffect, useState } from "react";
import "./UserManagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  
  const openReviews = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);

    const res = await fetch(
      `http://localhost:5000/api/reviews/${user._id}`
    );
    const data = await res.json();
    setReviews(data);
  };

  
  const toggleUserStatus = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/users/${id}/toggle`,
      { method: "PUT" }
    );
    const updated = await res.json();

    setUsers(users.map(u => (u._id === id ? updated : u)));
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <p className="subtitle">Manage users and monitor their reviews</p>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Reviews</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>

              <td>
                <span className={`status ${user.status}`}>
                  {user.status}
                </span>
              </td>

              <td>
                ⭐ {user.rating} ({user.reviewCount})
                <br />
                <button
                  className="review-btn"
                  onClick={() => openReviews(user)}
                >
                  View Reviews
                </button>
              </td>

              <td>
                <button
                  className={user.status === "active" ? "block" : "unblock"}
                  onClick={() => toggleUserStatus(user._id)}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </span>

            <h2>{selectedUser?.name} Reviews</h2>

            {reviews.length === 0 && <p>No reviews found</p>}

            {reviews.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="review-header">
                  <span className="rating">⭐ {r.rating}</span>
                  <span className="date">{r.date}</span>
                </div>

                <p><strong>Turf:</strong> {r.turf}</p>
                <p><strong>Game:</strong> {r.game}</p>
                <p><strong>Vendor:</strong> {r.vendor}</p>
                <p className="comment">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
