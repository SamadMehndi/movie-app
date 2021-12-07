// importing libraries and routes
const { Router } = require("express");
const { movieRouter } = require("./movies/routes");
const { authRouter } = require("./auth/routes");

const router = Router();

//defining routes
router.use("/api/movie", movieRouter);
router.use("/api/auth", authRouter);

//exporting the route
module.exports = { router };