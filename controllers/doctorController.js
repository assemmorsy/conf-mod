const { validationResult } = require("express-validator")
const path = require('path')

const Doctor = require("../models/Doctor")
const Specialty = require("../models/Specialty")
const ScientificDegree = require("../models/ScientificDegree")

const { useError, useValidationError } = require("../utils/useError")
const storages = require('../utils/useMulterStorages')
const { deleteFile } = require('../utils/filesOperations')

doctorController = {}

doctorController.postDoctor = (async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            throw useValidationError(errors)
        if (await Doctor.searchByEmail(req.body.email))
            throw useError("This email is already used", 400)
        if (await Doctor.searchByPhone(req.body.phone))
            throw useError("This phone number is already used", 400)

        const spec = await Specialty.getSpecialty(req.body.specialty)
        if (spec === null) throw useError("Specialty Not Found ", 404)

        const scientificDeg = await ScientificDegree.getScientificDegree(req.body.scientificDegree)
        if (scientificDeg === null) throw useError("scientific Degree Not Found ", 404)

        const doctor = await Doctor.postDoctor({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "phone": req.body.phone,
            "placeOfWork": req.body.placeOfWork,
            "scientificDegree": req.body.scientificDegree,
            "jobTitle": req.body.jobTitle,
            "university": req.body.university

        })
        await doctor.setSpecialty(spec)
        await doctor.setScientificDegree(scientificDeg)

        await doctor.reload({ attributes: { exclude: ['password', "specialtyId"] }, include: [Specialty, ScientificDegree] })
        return res.status(201).json({ message: "doctor added successfully", data: doctor });
    } catch (err) { next(err) }

})
doctorController.putDoctor = (async (req, res, next) => {
    try {
        const doctor = await Doctor.getDoctor(req.params.id)
        if (doctor === null)
            throw useError("can't find this doctor", 404)

        const errors = validationResult(req);

        if (!errors.isEmpty())
            throw useValidationError(errors)

        const emailSearchResult = await Doctor.searchByEmail(req.body.email)

        if (emailSearchResult && emailSearchResult.id !== req.params.id)
            throw useError("This email is already used", 400)

        const phoneSearchResult = await Doctor.searchByPhone(req.body.phone)

        if (phoneSearchResult && phoneSearchResult.id !== req.params.id)
            throw useError("This phone number is already used", 400)

        const spec = await Specialty.getSpecialty(req.body.specialty)
        if (spec === null)
            throw useError("Specialty Not Found ", 404)

        const scientificDeg = await ScientificDegree.getScientificDegree(req.body.scientificDegree)
        if (scientificDeg === null) throw useError("scientific Degree Not Found ", 404)

        const updatedDoctor = await Doctor.putDoctor(doctor,
            {
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "phone": req.body.phone,
                "placeOfWork": req.body.placeOfWork,
                "scientificDegree": req.body.scientificDegree,
                "jobTitle": req.body.jobTitle,
                "university": req.body.university
            })

        await updatedDoctor.setSpecialty(spec)
        await updatedDoctor.setScientificDegree(scientificDeg)
        await updatedDoctor.reload({ attributes: { exclude: ['password', "specialtyId"] }, include: [Specialty, ScientificDegree] })

        return res.status(200).json({ message: "doctor updated successfully", data: updatedDoctor });
    } catch (err) { next(err) }
})
doctorController.deleteDoctor = (async (req, res, next) => {
    try {
        const doctor = await Doctor.getDoctor(req.params.id)
        if (doctor === null)
            throw useError("can't find this doctor", 404)

        const data = await Doctor.deleteDoctor(doctor)
        if (data.imagePath !== null) {
            deleteFile(data.imagePath)
            console.log("file deleted");
        }
        return res.status(200).json({ message: "doctor deleted successfully", data: data });

    } catch (err) { next(err) }

})
doctorController.updateProfileImg = (async (req, res, next) => {
    try {

        if (!["image/jpeg", "image/png", "image/webp"].includes(req.file.mimetype))
            throw useError("doctor profile image must be image (png , webp, jpg ,jpeg)", 400)

        const doctor = await Doctor.getDoctor(req.params.id)
        if (doctor === null) throw useError("doctor not found ", 404)

        if (doctor.imagePath !== null) {
            deleteFile(doctor.imagePath)
        }
        imageURL = path.join(storages.doctorsProfilesStorage.relativePath, req.file.filename);

        await Doctor.updateProfileImg(doctor, imageURL)
        await doctor.reload({ attributes: { exclude: ['password'] }, include: Specialty })
        return res.status(200).json({ message: "doctor image saved", data: doctor });
    } catch (err) {
        next(err)
    }
})
doctorController.getAllDoctors = (async (req, res, next) => {
    try {
        const doctors = await Doctor.getDoctors()
        return res.status(200).json({ message: "all doctors ", data: doctors });

    } catch (err) { next(err) }
})
doctorController.getDoctorById = (async (req, res, next) => {
    try {
        const doctor = await Doctor.getDoctor(req.params.id)
        if (doctor === null)
            throw useError("can't find this doctor", 404)
        return res.status(200).json({ message: "Doctor :", data: doctor });

    } catch (err) { next(err) }
})

module.exports = doctorController