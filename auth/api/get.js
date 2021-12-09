// import AuthService
const AuthService = require('../services/authService');

// this function will give all users ( user/admin )
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await AuthService.getAllUser();

    // sending response
    return res.status(200).send({ success: true, payload: { AllUsers: allUsers } });
  } catch (e) {
    // Incase of an error, sending the error as response and printing the error on console
    console.log(e);
    res.status(500).send({ message: 'Error -> Can not complete a paging request.', error: e.message });
  }
};

// This function will return the details of a specific user
const getSpecificUser = async (req, res) => {
  try {
    // passing id to get the specific user
    const user = await AuthService.getSpecificUser(req.params.id);

    // sending the user details as response
    return res.status(200).send({ success: true, payload: user });
  } catch (e) {
    // Incase of an error, sending the error as response and printing the error on console
    // console.log(e);
    res.status(500).send({ message: 'Error -> cannot process this request. ', error: e.message });
  }
};

// exporting the getAllUsers
module.exports = { getAllUsers, getSpecificUser };
