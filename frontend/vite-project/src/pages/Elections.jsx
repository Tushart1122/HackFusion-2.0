import React, { useState, useEffect } from "react";
import axios from "axios";

const Elections = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/elections")
      .then(response => setCandidates(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">🗳 Student Elections</h1>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id} className="p-3 bg-white shadow-md my-2">
            {candidate.name} - {candidate.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Elections;
