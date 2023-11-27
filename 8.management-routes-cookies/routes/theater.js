const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home Theater");
});

router.get("/:id", (req, res) => {
  res.send("Show Theater by id");
});

router.post("/create", (req, res) => {
  res.send("Create Theater");
});

router.put("/:id", (req, res) => {
  res.send("Update Theater");
});

router.delete("/", (req, res) => {
  res.send("Delete Theater");
});

module.exports = router;
