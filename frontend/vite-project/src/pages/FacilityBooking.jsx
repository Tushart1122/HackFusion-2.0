import React, { useState, useEffect } from "react";
import axios from "axios";

const FacilityBooking = () => {
  const [facilities] = useState([
    "TennisCourt",
    "Auditorium",
    "LibraryHall",
    "SeminarRoom",
    "SportsGround",
  ]);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    facilityName: "",
    bookedBy: "", // Assume user ID is taken from authentication
    purpose: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
  });

  const [availability, setAvailability] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Facilitybooking");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  // Check Facility Availability
  const checkAvailability = async () => {
    if (!selectedFacility || !selectedDate) {
      alert("Please select a facility and date.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Facilitybooking/availability/${selectedFacility}/${selectedDate}`
      );
      setAvailability(response.data);
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  // Submit Booking Request
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/facilty-booking/book", newBooking);
      alert(response.data.message);
      fetchBookings();
    } catch (error) {
      console.error("Error booking facility:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Facility Booking System</h2>

      {/* Facility Availability Check */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-bold mb-2">Check Facility Availability</h3>
        <div className="flex gap-4">
          <select className="p-2 border rounded" onChange={(e) => setSelectedFacility(e.target.value)}>
            <option value="">Select Facility</option>
            {facilities.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
          <input type="date" className="p-2 border rounded" onChange={(e) => setSelectedDate(e.target.value)} />
          <button className="p-2 bg-blue-600 text-white rounded" onClick={checkAvailability}>
            Check Availability
          </button>
        </div>
        {availability && (
          <p className={`mt-2 ${availability.isAvailable ? "text-green-600" : "text-red-600"}`}>
            {availability.message}
          </p>
        )}
      </div>

      {/* Facility Booking Form */}
      <form onSubmit={handleBookingSubmit} className="mb-6 p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-bold mb-2">Book a Facility</h3>
        <div className="grid grid-cols-2 gap-4">
          <select name="facilityName" className="p-2 border rounded" onChange={handleInputChange} required>
            <option value="">Select Facility</option>
            {facilities.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
          <input type="text" name="bookedBy" className="p-2 border rounded" placeholder="Your User ID" onChange={handleInputChange} required />
          <input type="text" name="purpose" className="p-2 border rounded" placeholder="Purpose" onChange={handleInputChange} required />
          <input type="date" name="bookingDate" className="p-2 border rounded" onChange={handleInputChange} required />
          <input type="time" name="startTime" className="p-2 border rounded" onChange={handleInputChange} required />
          <input type="time" name="endTime" className="p-2 border rounded" onChange={handleInputChange} required />
        </div>
        <button type="submit" className="mt-4 p-2 bg-green-600 text-white rounded">
          Submit Booking
        </button>
      </form>

      {/* List of Bookings */}
      <div className="border rounded-lg bg-white p-4">
        <h3 className="text-lg font-bold mb-2">All Bookings</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Facility</th>
              <th className="border p-2">Booked By</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.facilityName}</td>
                <td className="border p-2">{booking.bookedBy?.name || "Unknown"}</td>
                <td className="border p-2">{booking.purpose}</td>
                <td className="border p-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="border p-2">{booking.startTime} - {booking.endTime}</td>
                <td className={`border p-2 ${booking.approvalStatus === "Approved" ? "text-green-600" : "text-red-600"}`}>
                  {booking.approvalStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilityBooking;
