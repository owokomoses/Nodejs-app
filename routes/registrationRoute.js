const express = require('express');
const registrationController = require('../controller/registrationController');
const router = express.Router();

router.post("/addUser", registrationController.addUser)
router.get("/getAllUsers", registrationController.getAllUsers)
router.get("/getUser/:id", registrationController.getUser)
router.patch("/updateUser/:id", registrationController.updateUser)
module.exports = router;