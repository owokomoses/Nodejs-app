const express = require('express')
const courseController = require('../controller/courseController')
const router = express.Router()

router.post("/addCourse",courseController.addCourse)

module.exports = router



