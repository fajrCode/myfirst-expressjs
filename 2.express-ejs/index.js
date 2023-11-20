const path = require("path");
const express = require("express");
const app = express();
const dataJson = require("./data.json");

app.set("view engine", "ejs");
//setting the path views to be able access from near directory (not from index.js directory) but it's optional when we want to edit default path views
//from /expressJS/views to /expressJS/2.express-ejs/views
app.set("views", path.join(__dirname, "/views"));
//make static folder for assets web (public/css)
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/test", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("test", { random: num });
});

app.get("/t/:tag", (req, res) => {
  const { tag } = req.params;
  const data = dataJson[tag];
  if (!data) {
    res.render("notfound", { tag });
  }
  res.render("tags", { data });
});

app.get("/cats", (req, res) => {
  const cats = ["Citty", "Willy", "Embul"];
  res.render("cats", { cats });
});

// app.get('*', (req, res) => {
//   res.render("<h1>Error 404: Page not Found</h1>");
// });

app.listen(5000, () => {
  console.log("listening on host http://localhost:5000");
});
