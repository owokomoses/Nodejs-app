const express = require("express")
const registrationController = require('../controller/registrationController')
const router = express.Router();

router.post('/addUser', registrationController.addUser)
router.get("/getAllUsers", registrationController.getAllUsers);

module.exports = router;