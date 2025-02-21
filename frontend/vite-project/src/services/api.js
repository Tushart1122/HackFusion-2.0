import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchElections = () => API.get("/elections");
export const submitComplaint = (data) => API.post("/complaints", data);
