//define express init
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//define port
const port = 5000;

//define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret-key')); //give parameter to make secret cookie or signing cookie

//define routes
app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

//test define signed cookie
app.get("/signingcookie", (res, req) => {
  res.cookie("paket", "runsel", { signed: true });
  res.send("signing cookie");
});

//test verify signed cookie
app.get("/verifycookie", (res, req) => {
  const cookies = res.signedCookies;
  res.send(cookies);
});

//start server
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
