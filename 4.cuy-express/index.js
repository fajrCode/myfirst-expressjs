const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(200, "response success");
});

app.get("/mahasiswa", (req, res) => {
  response(200, "this data", "try modular response", res);
  //   res.json(200, "success")
});

app.post("/mahasiswa", (req, res) => {
  res.send("response POST success");
});

app.put("/mahasiswa/:id", (req, res) => {
  const { id } = req.params;
  res.send(`response PUT for id ${id} success`);
});

app.delete("/mahasiswa/:id", (req, res) => {
  const { id } = req.params;
  res.send(`response DELETE for id ${id} success`);
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
