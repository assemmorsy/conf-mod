const router = require("express").Router()
const scientificDegreeController = require("../controllers/scientificDegreeController")

router.get("/scientific-degree", scientificDegreeController.getScientificDegrees)

module.exports = router