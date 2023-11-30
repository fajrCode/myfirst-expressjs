const userModel = require("./../models/users");

const getAllUsers = async (req, res) => {
  try {
    //pemanggilan ke db bersifat async
    const [data] = await userModel.getAllUsers();

    res.json({
      message: "GET all users success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
      serverMessage: err,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;
  try {
    await userModel.createNewUser(body);
    res.status(201).json({
      message: "CREATE new user success",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await userModel.updateUser(body, id);
    res.status(201).json({
      message: "Update User Success",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.status(200).json({
      message: "Delete User Success",
      data: {
        id: null,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
