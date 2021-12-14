// importing service, library and middlewares
const bcrypt = require('bcrypt');
const AuthService = require('../services/authService');
const { validateUserRegister, validateUserLogin } = require('../validation/validate');

// for adding user by admin (admin can add other admins and user)
const registerUser = async (req, res) => {
    // validating user/admin details
    const { error } = validateUserRegister(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    try {
    // checking if the user/admin is already exists in db or not
        const eml = req.body.email;
        const email = eml.toLowerCase();
        const isValidUser = await AuthService.validUser(email.trim());
        if (isValidUser) return res.status(404).send({ message: 'This Admin/User is already registered.' });

        // encrypting the user/admin password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        // defining user roles to be registered
        const userRoles = ['admin', 'user'];

        // checking the user role because only user/admin role is allowed to be registered
        if (userRoles.includes(req.body.role) === false) {
            return res.status(404).send({ message: 'This user-role is not allowed to be registered.' });
        }

        // taking user/admin details
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email,
            password,
            role: req.body.role,
        };

        // creating user and generating token
        const createUser = await AuthService.createUser(user);
        const token = await AuthService.jwtToken(createUser);
        // sending response
        return res.status(200).header('Authorization', token).send({ success: true, payload: createUser, message: `${user.role} added successfully.` });
    } catch (e) {
    // Incase of an error, sending the error as response as well as print the error in console
        console.log(e);
        return res.status(500).send({ success: false, exception: e.message });
    }
};

// admin/user login
const loginAuthUser = async (req, res) => {
    // validating admin/user details
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    try {
    // checking if the admin/user exists in db user collection or not
        const eml = req.body.email;
        const email = eml.toLowerCase();
        const isValidUser = await AuthService.validUser(email.trim());
        if (!isValidUser) return res.status(404).json({ msg: 'This User/Admin is not registered.' });

        // check if the user/admin 's password is correct or not
        const { password } = req.body;
        const isValidPassword = await bcrypt.compareSync(password, isValidUser.password);
        if (!isValidPassword) res.status(404).send('Unauthorized Access. Wrong Password!!');

        // sending jwt token in response
        const token = await AuthService.jwtToken(isValidUser);
        if (!token) return res.status(404).send({ success: false, message: 'Login Failed!!' });

        return res.status(200).header('Authorization', token).send({ success: true, payload: isValidUser.email, role: isValidUser.role });
    } catch (e) {
    // Incase of an error, sending the error as response as well as print the error in console
        console.log(e);
        return res.status(500).send({ success: false, exception: e.message });
    }
};

module.exports = { registerUser, loginAuthUser };
