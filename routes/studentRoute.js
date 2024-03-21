const express = require ( 'express' )

const studentController = require ('../Controller/studentController')
const router = express.Router()

router.post('/addStudent', studentController.addStudent) //Add a new Student to the database

module.exports = router; 