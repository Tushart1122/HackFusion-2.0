import "../components/CheatingRecords.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CheatingRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cheating.model/public");
        setRecords(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cheating records");
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Public Cheating Records</h2>

      {loading && <p>Loading records...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {records.length > 0 ? (
        <ul>
          {records.map((record) => (
            <li key={record._id} className="border p-4 mb-2">
              <p><strong>Student:</strong> {record.student?.name || "Unknown"}</p>
              <p><strong>Exam:</strong> {record.examName}</p>
              <p><strong>Subject:</strong> {record.subject}</p>
              <p><strong>Reason:</strong> {record.reason}</p>
              <p><strong>Status:</strong> {record.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cheating records found.</p>
      )}
    </div>
  );
};

export default CheatingRecords;
