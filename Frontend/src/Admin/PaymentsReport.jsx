import { useEffect, useState } from "react";
import "./PaymentsReport.css";

export default function PaymentsReport() {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    vendorEarnings: 0,
    adminCommission: 0,
    totalTransactions: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payments/report`
      );
      const data = await res.json();

      if (data.success) {
        setSummary(data.summary);
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error("Failed to fetch payments report", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-report">
      <h1>Payments & Reports</h1>
      <p className="subtitle">Track revenue & transactions</p>

      
      <div className="summary">
        <div className="card">
          Total Revenue
          <p>₹{summary.totalRevenue.toLocaleString("en-IN")}</p>
        </div>

        <div className="card">
          Vendor Earnings
          <p>₹{summary.vendorEarnings.toLocaleString("en-IN")}</p>
        </div>

        <div className="card">
          Admin Commission
          <p>₹{summary.adminCommission.toLocaleString("en-IN")}</p>
        </div>

        <div className="card">
          Transactions
          <p>{summary.totalTransactions}</p>
        </div>
      </div>

      
      <table>
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>User</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Mode</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Loading payments...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn._id}>
                <td>{txn.txnId}</td>
                <td>{txn.user}</td>
                <td>{txn.vendor}</td>
                <td>₹{txn.amount.toLocaleString("en-IN")}</td>
                <td>{txn.mode}</td>
                <td>
                  <span className={`status ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
