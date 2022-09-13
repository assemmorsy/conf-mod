const router = require("express").Router()
const specialtyController = require("../controllers/specialtyController")

router.get("/specialty", specialtyController.getSpecialties)

module.exports = router