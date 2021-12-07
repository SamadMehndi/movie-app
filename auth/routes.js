// importing libraries and functions
const { Router } = require('express');
const { getSpecificUser } = require('./api/index');
const authRouter = Router();
const { getAllUsers ,registerUser, loginAuthUser } = require('./api/index');
const { updateUsers, updatePassword, deleteUsers } = require('./api/index');
const { verifyUserToken } = require('../middlewares/userAuth');
const { verifyAdmin, verifyAdminUser } = require('../middlewares/userAuth');

// defining routes
authRouter.post("/register", registerUser);
authRouter.post("/login", loginAuthUser);
authRouter.get("/allusers",verifyUserToken,verifyAdmin, getAllUsers);
authRouter.get("/getspecificuser/:id",verifyUserToken,verifyAdminUser, getSpecificUser);
authRouter.put("/update/:id",verifyUserToken,verifyAdmin, updateUsers);
authRouter.put("/changepassword",verifyUserToken,verifyAdminUser, updatePassword);
authRouter.delete("/delete/:id",verifyUserToken,verifyAdmin, deleteUsers);

// exporting authRouter
module.exports = { authRouter };
