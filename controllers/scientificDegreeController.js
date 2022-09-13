const ScientificDegree = require("../models/ScientificDegree");

scientificDegreeController = {}
scientificDegreeController.getScientificDegrees = async (req, res, next) => {
    try {
        const scientificDegrees = await ScientificDegree.getScientificDegrees()
        return res.status(200).json({ message: "all Scientific Degrees :", data: scientificDegrees });
    }
    catch (err) { next(err) }
}

module.exports = scientificDegreeController