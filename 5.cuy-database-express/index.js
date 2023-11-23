const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

//routes / url / endpoint
app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.query("SELECT * FROM mhs", (error, result) => {
    //result from database
    console.log(result);
    // res.send(result);
    response(200, result, "response success", res);
  });
});

app.get("/hello", (req, res) => {
  res.send("utama");
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
