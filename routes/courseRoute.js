const express = require('express');
const courseController = require('../controller/courseController');
const router = express.Router();

router.post("/addCourse", courseController.addCourse)
//router.get("/getAllCourses", courseController.getAllCourses)
//router.get("/getCourse/:id", courseController.getCourse)
//router.patch("/updateCourse/:id", courseController.updateCourse)
module.exports = router;