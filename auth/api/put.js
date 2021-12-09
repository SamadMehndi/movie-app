// Import AuthService , functions and libraries
const bcrypt = require('bcrypt');
const AuthService = require('../services/authService');
const { validateUserUpdate, validateUserChangePassword } = require('../validation/validate');

// this function will update the user
const updateUsers = async (req, res) => {
  // validating the details of user/admin
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    // checking if the user/admin is already registered or not
    const isUpdateUser = await AuthService.checkUserId(req.params.id);
    // If user not registered, sending error as response
    if (isUpdateUser === null) {
      return res.status(404).send({ message: 'This user/admin is not registered.' });
    }

    // defining user roles to be updated
    const userRoles = ['admin', 'user'];

    // checking the user role because only user/admin role is allowed to be updated
    if (userRoles.includes(req.body.role) === false) {
      return res.status(404).send({ message: 'This user role is not allowed to be updated.' });
    }

    // Take user/admin details
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
    };

    // updating user/admin details and sending response
    // eslint-disable-next-line no-unused-vars
    const upadateUserDetails = await AuthService.updateUser(req.params.id, user);
    return res.status(200).send({ success: true, message: 'User/admin details has been updated successfully.' });
  } catch (err) {
    // incase of an error, sending the error as response and printing the same on console
    console.log(err);
    return res.status(500).send({ success: false, exception: err.message });
  }
};

// This function will update the password of user
const updatePassword = async (req, res) => {
  // validating the changed user/admin password details
  const { error } = validateUserChangePassword(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    // checking if the user exists in db or not
    const eml = req.body.email;
    const email = eml.toLowerCase();
    const isValidUser = await AuthService.validUser(email.trim());
    if (!isValidUser) return res.status(404).send({ message: 'Admin/User is not registered.' });

    // password encryption
    const getPassword = req.body.oldPassword;
    const isValidPassword = await bcrypt.compareSync(getPassword, isValidUser.password);

    // checking if the new password and confirm new password matches or not
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res.status(404).json({ message: 'New password and confirm password does not match.' });
    }

    // checking if the old password is valid
    if (isValidPassword === true) {
      // encrypting new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

      // taking password
      const updatedPassword = { password: hashedPassword };

      // updating the new password and sending the response for the same
      // eslint-disable-next-line no-unused-vars
      const changedPassword = await AuthService.updateNewPassword(email, updatedPassword);
      return res.status(200).send({ success: true, message: 'Password changed successfully.' });
    }
    //  sending error response if password is invalid
    return res.status(200).send({ message: 'You have entered an invalid password.' });
  } catch (err) {
    // incase of an error, sending the error as response and printing the same on console
    console.log(err);
    return res.status(500).send({ success: false, exception: err.message });
  }
};

module.exports = { updateUsers, updatePassword };
