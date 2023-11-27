//define express init
const express = require("express");
const app = express();

//define port
const port = 5000;

//define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//define routes
app.use('/theater',require('./routes/theater'));
app.use('/movies',require('./routes/movies'));

//start server
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
