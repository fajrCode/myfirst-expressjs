const express = require("express");
const userController = require("./../controller/users");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.post("/", userController.createNewUser);

module.exports = router;
