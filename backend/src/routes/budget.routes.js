const express = require("express");
const router = express.Router();
const Budget = require("../models/budget"); 
router.post("/submit-budget", async (req, res) => {
    try {
        const { organizerType, organizerName, eventName, allocatedAmount, sponsorships, proof } = req.body;

        // Validate required fields
        if (!organizerType || !organizerName || !eventName || allocatedAmount === undefined) {
            return res.status(400).json({ message: "All required fields must be provided!" });
            return res.status(400).json({ message: "All required fields must be provided!" });
        }

        const newBudget = new Budget({
            organizerType,
            organizerName,
            eventName,
            allocatedAmount,
            sponsorships: sponsorships || 0, 
            proof: proof || []
        });
        const savedBudget = await newBudget.save();
        res.status(201).json({ message: "Budget request submitted successfully", budget: savedBudget });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find().populate("verifiedBy", "name email"); 
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📌 3. Get budget details by ID
router.get("/:id", async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id).populate("verifiedBy", "name email");
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📌 4. Update budget (Upload additional proofs)
router.put("/:id/update-proof", async (req, res) => {
    try {
        const { proof } = req.body;

        // Find the budget
        const budget = await Budget.findById(req.params.id);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        // Append new proofs to existing ones
        budget.proof = [...budget.proof, ...proof];
        const updatedBudget = await budget.save();

        res.status(200).json({ message: "Proof uploaded successfully", budget: updatedBudget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id/verify", async (req, res) => {
    try {
        const { status, remarks, verifiedBy } = req.body;
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use 'Approved' or 'Rejected'." });
        }
        const updatedBudget = await Budget.findByIdAndUpdate(
            req.params.id,
            { status, remarks, verifiedBy },
            { new: true, runValidators: true }
        );

        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        res.status(200).json({ message: `Budget ${status.toLowerCase()} successfully`, budget: updatedBudget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
        if (!deletedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
