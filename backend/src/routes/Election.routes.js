const express = require("express");
const { Election, Candidate, Vote } = require("../models/Election");
const router = express.Router();

// Middleware to validate that email ends with "@sggs.ac.in"
const verifyCollegeEmail = (req, res, next) => {
  const email = req.body.email;
  if (!email || !email.endsWith("@sggs.ac.in")) {
    return res.status(400).json({ message: "Only college emails (@sggs.ac.in) are allowed." });
  }
  next();
};

// GET: Retrieve election data with candidate profiles
router.get("/", async (req, res) => {
  try {
    // Assuming only one active election for simplicity
    const election = await Election.findOne({}).populate("candidates");
    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving election data", error });
  }
});

// POST: Cast a vote (requires college email validation)
// Note: In a real app, user authentication middleware would also be used.
router.post("/vote", verifyCollegeEmail, async (req, res) => {
  try {
    const { userId, candidateId, electionId } = req.body;

    // Check if the user has already voted in this election
    const existingVote = await Vote.findOne({ user: userId, election: electionId });
    if (existingVote) {
      return res.status(400).json({ message: "User has already voted." });
    }

    // Create a new vote record
    const vote = new Vote({ user: userId, candidate: candidateId, election: electionId });
    await vote.save();

    // Increment candidate votes
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

    // Retrieve updated candidate information
    const candidate = await Candidate.findById(candidateId);

    // Broadcast updated vote counts via websockets
    const io = req.app.get("io");
    if (io) {
      io.emit("voteUpdate", { candidateId: candidate._id, votes: candidate.votes });
    }

    res.status(200).json({ message: "Vote cast successfully", candidate });
  } catch (error) {
    res.status(500).json({ message: "Error casting vote", error });
  }
});

module.exports = router;
