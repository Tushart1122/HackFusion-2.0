import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/complaint/all");
        setComplaints(response.data);
      } catch (err) {
        setError("Failed to fetch complaints");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Complaints</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {complaints.map((complaint) => (
          <li key={complaint.id} className="border p-3 rounded-lg shadow">
            <h3 className="font-semibold">{complaint.title}</h3>
            <p className="text-sm text-gray-700">{complaint.description}</p>
            <p className="text-xs text-gray-500">Submitted by: {complaint.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckComplaints;