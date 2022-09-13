const Specialty = require("../models/Specialty");

specialtyController = {}
specialtyController.getSpecialties = async (req, res, next) => {
    try {
        const specialties = await Specialty.getSpecialties()
        return res.status(200).json({ message: "all specialties :", data: specialties });
    }
    catch (err) { next(err) }
}

module.exports = specialtyController