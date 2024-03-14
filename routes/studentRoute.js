const express = require('express')
const studentController = require('../conroller/studentController')
const router = express.Router()

router.post("/addStudent",studentController.addStudent)

module.exports = router