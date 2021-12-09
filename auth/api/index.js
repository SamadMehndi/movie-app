// importing the functions
const { getAllUsers, getSpecificUser } = require('./get');
const { registerUser, loginAuthUser } = require('./post');
const { updateUsers, updatePassword } = require('./put');
const { deleteUsers } = require('./delete');

// exporting the functions
module.exports = {
  getAllUsers,
  registerUser,
  loginAuthUser,
  updateUsers,
  updatePassword,
  deleteUsers,
  getSpecificUser,
};
