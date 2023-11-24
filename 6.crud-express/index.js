const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

//middleware
app.use(bodyParser.json());

//endpoint
app.get("/", (req, res) => {
  response(200, "Response Success", "API v1 Ready to use", res);
});

app.get("/mhs", (req, res) => {
  const sql = "SELECT * FROM mhs";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "internal server error", res);
    }
    response(200, result, "get data all mahasiswa", res);
  });
});

app.get("/mhs/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM mhs WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "internal server error", res);
    }
    //check result, if empty throw error
    if (!result.RowDataPacket) {
      response(401, "no data found", "Client Side Error", res);
    } else {
      response(200, result, "get data all mahasiswa", res);
    }
  });
});

app.post("/mhs", (req, res) => {
  const { name, gender, major } = req.body;
  const sql = `INSERT INTO mhs (fullname,gender,major) VALUES ('${name}','${gender}','${major}')`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Fail insert data", "Internal Server Error", res);
    }
    //check if result is ready then executioni next (affectedRows) 
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "insert data mhs success", res);
    }
  });
});

app.put("/mhs/:id", (req, res) => {
  const { id } = req.params;
  const { name, gender, major } = req.body;
  const sql = `UPDATE mhs SET fullname='${name}', gender='${gender}',major='${major}' WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, "fail update data", "internal server error", res);
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        changed: result.message,
      };
      response(200, data, `update data mhs with id ${id} success`, res);
    }
  });
});

app.delete("/mhs/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM mhs WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Fail Deleting Data", "Internal Server Error", res);
    }
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, `delete data mhs with id ${id} success`, res);
    }else{
      response(401, `user not found with id ${id}`, `Client Side Error`, res);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
