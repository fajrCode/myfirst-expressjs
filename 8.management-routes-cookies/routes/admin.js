const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  //check from query (for example)
  if (req.query.isAdmin) {
    next();
  }
  res.send("Sorry only for Administrator!");
});

router.get("/", (req, res) => {
    //add cookies
  res.cookie("user", "admin");
  res.send("Dashboard Admin");
});

router.get("/:id", (req, res) => {
  res.send("Show Admin by id");
});

router.post("/create", (req, res) => {
  res.send("Create Admin");
});

router.put("/:id", (req, res) => {
  res.send("Update Admin");
});

router.delete("/", (req, res) => {
  res.send("Delete Admin");
});

module.exports = router;
