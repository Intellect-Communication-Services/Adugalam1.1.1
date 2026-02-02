import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [today, setToday] = useState({});
  const [chartData, setChartData] = useState([]);

  
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`
      );
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setToday(data.today);
        setChartData(data.weekly);
      }
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    }
  };

  
  const data = {
    labels: chartData.map((d) => d.day),
    datasets: [
      {
        label: "Bookings",
        data: chartData.map((d) => d.bookings),
        backgroundColor: "#22c55e",
        barThickness: 14,
      },
      {
        label: "Revenue (₹)",
        data: chartData.map((d) => d.revenue),
        backgroundColor: "#14532d",
        barThickness: 14,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } },
    },
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <main className="main">
      <header className="header">
        <h1>Adugalam – Admin Dashboard</h1>
        <p>Complete control over turfs, bookings, vendors & users</p>
      </header>

      
      <section className="stats-cards">
        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h4>Total Vendors</h4>
          <p>{stats.vendors}</p>
        </div>
        <div className="stat-card">
          <h4>Total Turfs</h4>
          <p>{stats.turfs}</p>
        </div>
        <div className="stat-card">
          <h4>Total Bookings</h4>
          <p>{stats.bookings}</p>
        </div>
      </section>

      
      <section className="today">
        <h2>Today’s Overview</h2>
        <div className="today-box">
          <div className="today-card">Bookings <span>{today.bookings}</span></div>
          <div className="today-card">Revenue <span>₹{today.revenue}</span></div>
          <div className="today-card">New Users <span>{today.users}</span></div>
          <div className="today-card">New Vendors <span>{today.vendors}</span></div>
        </div>
      </section>

      
      <section className="analytics">
        <h2>Booking & Revenue Comparison</h2>
        <div className="chart-wrapper">
          <Bar data={data} options={options} />
        </div>
      </section>

      <footer className="footer">
        © 2025 Adugalam Turf Booking Platform
      </footer>
    </main>
  );
}
