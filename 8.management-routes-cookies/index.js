//define express init
const express = require("express");
const app = express();

//define port
const port = 5000;

//define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//define routes
app.get("/", (req, res) => {
  res.send("Response Success");
});

//start server
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
