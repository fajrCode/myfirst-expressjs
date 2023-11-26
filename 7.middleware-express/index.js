const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan"); //package to show log from activity req client

app.use(morgan("tiny")); // middleware is use first before execute code above
//test middleware custom
app.use((req,res, next) => {
  console.log("hello middleware");
  next();
  console.log("hello middleware after next");

});

app.use((req,res, next) => {
    console.log("hello middleware 2");
    next();
  });

app.get("/", (req, res) => {
  res.send("Response Success");
});

app.get("/test", (req, res) => {
  res.send("Response Test Success");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
