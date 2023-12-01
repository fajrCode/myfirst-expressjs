const dbPool = require("./../config/db");

const getAllUsers = () => {
  const sql = "SELECT * FROM users";

  return dbPool.execute(sql);
};

const createNewUser = (body) => {
  const sql = `INSERT INTO users (name,email,address) 
  VALUES ('${body.name}','${body.email}','${body.address}')`;

  return dbPool.execute(sql);
};

const updateUser = (body, id) => {
  const sql = `UPDATE users 
  SET name='${body.name}',email='${body.email}',address='${body.address}' 
  WHERE id=${id}`;

  return dbPool.execute(sql);
};

const deleteUser = (id) => {
  const sql = `DELETE FROM users WHERE id=${id}`;
  return dbPool.execute(sql);
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
