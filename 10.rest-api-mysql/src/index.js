require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/users");
const upload = require("./middleware/multer");
const middlewareLogRequest = require("./middleware/logs");

app.use(middlewareLogRequest);
app.use(express.json());
app.use("/assets/", express.static("public/images"));

app.use("/user", userRoutes);
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    message: "upload berhasil",
  });
});

//error handling
app.use((err, req, res, next) => {
  res.status(400).json({
    message: "Bad Request",
    data: err.message,
  });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
