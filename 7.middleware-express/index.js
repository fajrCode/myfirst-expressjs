const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan"); //package to show log from activity req client

app.use(morgan("tiny")); // middleware is use first before execute code above
//test middleware custom
// app.use((req,res, next) => {
//   console.log("hello middleware");
//   next();
//   console.log("hello middleware after next");

// });

// app.use((req,res, next) => {
//     console.log("hello middleware 2");
//     next();
//   });

// app.use((req, res, next) => {
//   req.timeRequest = Date.now();
//   console.log(req.method, req.url, res.statusCode, req.timeRequest);
//   next();
// });

const auth = (req, res, next) => {
  const { password } = req.query; //just for train,
  if (password === "password") {
    next();
  }
  res.send("Need Password to access");
};

app.get("/", (req, res) => {
  res.send("Response Success");
  //   console.log(req.timeRequest);
});

app.get("/test", (req, res) => {
  res.send("Response Test Success");
});

//set middleware as a function before and be first callback in the parameter
app.get("/admin", auth, (req, res) => {
    res.send("Hello admin")
});

//direct bad url  using middleware.
app.use((req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
