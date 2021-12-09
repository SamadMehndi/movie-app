// importing AuthService
const AuthService = require('../services/authService');

// this function is deleting the user/admin
const deleteUsers = async (req, res) => {
  try {
    // passing the id to delete the user/admin
    const deleteUser = await AuthService.deleteUser(req.params.id);

    // checking if the user/admin is registered or not or deleted already
    if (deleteUser == null) {
      return res.status(404).send({ message: 'This user/admin is not registered or deleted already.' });
    }

    // If deleted successfully, sending response for success
    return res.status(200).send({ success: true, message: `The User/Admin ID - ${req.params.id} has been deleted successfully.` });
  } catch (err) {
    // incase of an error, sending the error as response as well as printing the error message on console
    console.log(err);
    res.status(500).send({ success: false, exception: err.message });
  }
};

// Exporting the deleteUsers
module.exports = { deleteUsers };
