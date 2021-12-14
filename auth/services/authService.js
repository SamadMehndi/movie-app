// importing user model
const jwt = require('jsonwebtoken');
const { User } = require('../model/index');
const config = require('../../config/default.json');

// defining AuthService
class AuthService {
    // checking for valid user
    static async validUser(eml) {
        return await User.findOne({ email: eml });
    }

    // creating user/admin
    static async createUser(user) {
        return await User.create(
            user,
        );
    }

    // getting all users
    static async getAllUser() {
        return await User.find();
    }

    // getting specific user
    static async getSpecificUser(id) {
        return await User.findOne({
            _id: id,
        });
    }

    // checking user by id
    static async checkUserId(id) {
        return await User.findById(id);
    }

    // updating user/admin details :-
    static async updateUser(id, body) {
        return await User.updateOne({ _id: id }, { $set: body });
    }

    // updating user/admin password
    static async updateNewPassword(email, body) {
        return await User.updateOne({ email }, { $set: body });
    }

    // deleting user/admin
    static async deleteUser(id) {
        return await User.findByIdAndDelete({ _id: id });
    }

    // generating jwtToken for user/admin
    static jwtToken(user) {
        const token = jwt.sign(
            {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                role: user.role,
            },
            config.jwtPrivateKey,
            {
                expiresIn: '5d',
            },
        );

        return token;
    }
}

// exporting AuthService
module.exports = AuthService;
