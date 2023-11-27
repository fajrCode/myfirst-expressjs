const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { user = "noname" } = req.cookies;

  res.send(`hello ${user} Movies`);
});

router.get("/:id", (req, res) => {
  res.send("Show Movies by id");
});

router.post("/create", (req, res) => {
  res.send("Create Movies");
});

router.put("/:id", (req, res) => {
  res.send("Update Movies");
});

router.delete("/", (req, res) => {
  res.send("Delete Movies");
});

module.exports = router;
