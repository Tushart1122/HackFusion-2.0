const Election = require("../models/Election");

const getElections = async (req, res) => {
    try {
        const elections = await Election.find();
        res.json(elections);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getElections };
