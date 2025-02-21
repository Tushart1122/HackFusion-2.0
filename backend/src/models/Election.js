const mongoose = require("mongoose");

// Candidate Schema
const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profile: { type: String }, // e.g., URL to candidate's profile image or bio
  position: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

// Election Schema
const ElectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

// Vote Schema (enforcing one vote per user per election)
const VoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true }
});

const Candidate = mongoose.model("Candidate", CandidateSchema);
const Election = mongoose.model("Election", ElectionSchema);
const Vote = mongoose.model("Vote", VoteSchema);

module.exports = { Candidate, Election, Vote };
