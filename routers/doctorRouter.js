const router = require("express").Router()
const { body } = require('express-validator');
const multer = require('multer')

const storages = require('../utils/useMulterStorages')
const doctorController = require("../controllers/doctorController")

const upload = multer({ storage: storages.doctorsProfilesStorage })

router.post("/doctors/:id/profile-image", upload.single("doctorImage"), doctorController.updateProfileImg)

router.post("/doctors",
    body("firstName").isAlpha().isLength({ min: 2 }),
    body("lastName").isAlpha().isLength({ min: 2 }),
    body("email").isEmail(),
    body("phone").isMobilePhone().isLength({ min: 2 }),
    body("specialty").isInt(),
    body("placeOfWork").isString(),
    body("scientificDegree").isInt(),
    body("jobTitle").isString(),
    body("university").isString()
    , doctorController.postDoctor)

router.put("/doctors/:id",
    body("firstName").isAlpha().isLength({ min: 2 }),
    body("lastName").isAlpha().isLength({ min: 2 }),
    body("email").isEmail(),
    body("phone").isMobilePhone().isLength({ min: 2 }),
    body("specialty").isInt(),
    body("placeOfWork").isString(),
    body("scientificDegree").isInt(),
    body("jobTitle").isString(),
    body("university").isString()
    , doctorController.putDoctor)

router.delete("/doctors/:id", doctorController.deleteDoctor)


router.get("/doctors", doctorController.getAllDoctors)

router.get("/doctors/:id", doctorController.getDoctorById)

module.exports = router