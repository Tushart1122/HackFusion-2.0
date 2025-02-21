require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");
const adminRoutes = require("./src/routes/admin.routes");
const facultyroutes=require("./src/routes/faculty.routes")
const Studentroutes=require("./src/routes/studentRoutes");
const Leaveroute=require("./src/routes/leave.route")
const Complaintroute=require("./src/routes/complaint.routes");
const Cheatingroutes=require("./src/routes/cheating.routes");
const Budegetroutes=require("./src/routes/budget.routes");
const facilityroutes =require("./src/routes/facility.routes");
const Electionroutes=require("./src/routes/Election.routes");
// const authRoutes = require("./src/routes/auth.routes.js");


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" } 
});
app.set("io", io);

app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/admin",adminRoutes);
app.use("/api/faculty.model",facultyroutes);
app.use("/api/student.model",Studentroutes);
app.use("/api/leave.model",Leaveroute);
app.use("/api/complaint",Complaintroute);
app.use("/api/cheating.model",Cheatingroutes);
app.use("/api/budget",Budegetroutes);
app.use("/api/Facilitybooking",facilityroutes);
app.use("/api/Election",Electionroutes);
// app.use("/api/user", authRoutes);
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
