const express = require("express");
const router = express.Router();
const authGoogle = require("./../controller/controller");
const mail = require("./../mail");

router.route("/google").get(authGoogle.authorizationUrl);
router.route("/google/callback").get(authGoogle.googleCallback);
router.route("/google/send").get(mail.sendMail);

module.exports = router;
