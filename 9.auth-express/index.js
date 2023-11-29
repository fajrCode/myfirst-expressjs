const express = require("express");
const app = express();
const port = 5000;
const db = require("./connection");
const bodyParser = require("body-parser");
const { hashPassword, check } = require("./auth");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "katakunci",
    resave: false,
    saveUninitialized: false,
  })
);

//middleware dalam bentuk function untuk di masukkan langsung di routes
const auth = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect("/login");
  } else {
    next();
  }
};

const authLogin = (req, res, next) => {
  if (req.session.userID) {
    res.redirect("/admin");
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.send("Response Success");
});

app.get("/register", authLogin, (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, pw } = req.body;

  const pwh = await hashPassword(pw);

  const sql = `INSERT INTO users (username,pw) VALUES ('${username}','${pwh}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    }
    console.log(result);
    res.redirect("/login");
  });
});

app.get("/login", authLogin, (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, pw } = req.body;
  const sql = `SELECT * FROM users WHERE username='${username}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    }
    if (!result[0]) {
      console.log("Tidak ada data yang ditemukan");
      res.redirect("/login");
    } else {
      check(pw, result[0].pw);
      console.log(`user is: ${result[0].username}`);
      console.log(`Pw is: ${result[0].pw}`);
      //membuat session dengan nama userID
      req.session.userID = result[0].username;
      res.redirect("/admin");
    }
  });
});

app.get("/admin", (req, res) => {
  //mengecek apakah ada session dengan nama userID, ini tanpa middleware
  if (!req.session.userID) {
    res.redirect("/login");
  } else {
    res.render("admin");
  }
});

//direct dengan pengecekan middleware
app.get("/setting", auth, (req, res) => {
  res.send("Setting Page");
});

app.get("/logout", auth, (req, res) => {
  //   console.log(req.session.userID); //bisa gunakan cara ini jika ingin menghapus 1 sesion saja
  //   req.session.userID = null;
  //   console.log(req.session.userID); //bisa gunakan cara ini jika ingin menghapus 1 sesion saja
  //   res.redirect("/login");
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
