import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/budget.css";

const BudgetRequests = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/budget");
        setBudgets(response.data);
      } catch (err) {
        setError("Failed to load budget requests. Please try again later.");
      }
      setLoading(false);
    };

    fetchBudgets();
  }, []);

  return (
    <div className="budget-container">
      <h2 className="budget-title">Budget Requests</h2>

      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error">{error}</p>}

      <div className="budget-grid">
        {budgets.length > 0 ? (
          budgets.map((budget) => (
            <div key={budget._id} className="budget-card">
              <h3>{budget.eventName}</h3>
              <p>
                <strong>Organizer:</strong> {budget.organizerName} ({budget.organizerType})
              </p>
              <p>
                <strong>Allocated Amount:</strong> ₹{budget.allocatedAmount}
              </p>
              <p>
                <strong>Sponsorships:</strong> ₹{budget.sponsorships}
              </p>
              <p className={`status ${budget.status.toLowerCase()}`}>
                <strong>Status:</strong> {budget.status}
              </p>
              {budget.remarks && (
                <p className="remarks">
                  <strong>Remarks:</strong> {budget.remarks}
                </p>
              )}
            </div>
          ))
        ) : (
          !loading && <p className="no-requests">No budget requests found.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetRequests;
