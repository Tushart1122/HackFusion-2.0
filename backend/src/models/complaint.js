import { Schema, model } from "mongoose";

const ComplaintSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Student", // Complaint is filed by a student
    //   required: function () {
    //     return !this.anonymous; // Required if not anonymous
    //   },
    // },
    studentName: {
      type: String,
      required: true, // Name of the student filing the complaint
    },
    regNo: {
      type: String,
      required: true, // Registration number of the student
    },
    year: {
      type: String,
      required: true, // Year of the student
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    anonymous: {
      type: Boolean,
      default: false, // True if user submits anonymously
    },
    category: {
      type: String,
      enum: ["Academic", "Harassment & Ragging", "Facility Issue", "Hostel"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Resolved"],
      default: "Pending",
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin", // Admin or faculty reviewing the complaint
    },
    resolutionNotes: {
      type: String, // Notes from the reviewer on the resolution
    },
  },
  { timestamps: true }
);

export default model("Complaint", ComplaintSchema);
