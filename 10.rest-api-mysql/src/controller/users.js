const getAllUsers = (req, res) => {
  const data = {
    id: 1,
    name: "fajri",
    email: "admin@gmail.com",
    address: "jambi",
  };
  res.json({
    message: "GET all users success",
    data: data,
  });
};

const createNewUser = (req, res) => {
  res.json({
    message: "CREATE new user success",
    data: req.body,
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.json({
    message: "Update User Success",
    data: req.body,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.json({
    message: "Delete User Success",
    data: {
      id: id,
      name: "fajr",
      email: "admin@gmail.com",
      address: "jambi",
    },
  });
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
