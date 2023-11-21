const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.json()); //for parsing application/json or receive data json
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded or receive data form
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuidv4(),
    username: "Aji",
    text: "Text from Aji",
  },
  {
    id: uuidv4(),
    username: "Budi",
    text: "Text from Budi",
  },
  {
    id: uuidv4(),
    username: "Ani",
    text: "Text from Ani",
  },
  {
    id: uuidv4(),
    username: "Upin",
    text: "Text from Upin",
  },
  {
    id: uuidv4(),
    username: "Ipin",
    text: "Text from Ipin",
  },
];

// routes
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments", (req, res) => {
  const { username, text } = req.body;
  console.log([...comments]);
  comments.push({ username, text, id: uuidv4() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (!comment) {
    res.render("comments/notfound", { id });
  } else {
    res.render("comments/show", { comment });
  }
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/update", { comment });
});
//put for all chance field, patch just one field
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.text;
  const oldComment = comments.find((c) => c.id === id);
  oldComment.text = newComment;
  console.log("update data success");
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

// app.get("/add", (req, res) => {
//   res.send("<h5>Respone get success</h5>");
// });

// app.post("/add", (req, res) => {
//   const { name, qty } = req.body;
//   res.send(`Name: ${name} - Qty: ${qty}`);
// });

app.listen(5000, () => {
  console.log("listen http://localhost:5000");
});
