import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import"../components/FacultyLogin.css"
const FacultyLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        // Validate email format
        if (!formData.email.endsWith("@sggs.ac.in")) {
            setError("Email must end with '@sggs.ac.in'");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/faculty.model/login", formData,{headers: { "Content-Type": "application/json"  }});
            
            setMessage(response.data.message);
            
            // Store token in localStorage
            localStorage.setItem("facultyToken", response.data.token);

            console.log('success')

            // Redirect to dashboard (adjust as needed)
            setTimeout(() => {
                navigate("/faculty-dashboard");
            }, 1500);
            
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Faculty Login</h2>

            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
};

export default FacultyLogin;
