const express = require("express");
const app = express();
const port = 5000;
const db = require("./connection");
const bodyParser = require("body-parser");
const { hashPassword, check } = require("./auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Response Success");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, pw } = req.body;

  const pwh = await hashPassword(pw);

  const sql = `INSERT INTO users (username,pw) VALUES ('${username}','${pwh}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, pw } = req.body;
  const sql = `SELECT pw FROM users WHERE username='${username}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (!result.RowDataPacket) {
      console.log("Tidak ada data yang ditemukan");
      res.send("Data not Found");
    } else {
      res.send(result[0].pw);
      console.log(result[0].pw);
      check(pw, result[0].pw);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
