const express = require("express");
const app = express();
const port = 5000;
const userRoutes = require("./routes/users");

const middlewareLogRequest = require("./middleware/logs");

app.use(middlewareLogRequest);
app.use(express.json());

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
