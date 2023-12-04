require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/router");

app.use(express.json());

app.use("/auth", router);

app.get("/", (req, res) => {
  console.log("hellow WOrdl");
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("server running");
});
