// importing joi for validation 
const Joi = require("joi");

// validating movie create
const validateMovieCreate = (movie) => {
    const schema = Joi.object({
        movieId: Joi.number().required(),
        movieName: Joi.string().min(2).max(100).required(),
        movieGenre: Joi.string().min(2).max(100).required(),
        movieDescription: Joi.string().min(2).max(300).required()
    });
    return schema.validate(movie);
}

// validating movie update
const validateMovieUpdate = (movie) => {
    const schema = Joi.object({
        movieName: Joi.string().min(1).max(100).required(),
        movieGenre: Joi.string().min(1).max(100).required(),
        movieDescription: Joi.string().min(1).max(300).required()
    });
    return schema.validate(movie);
};

//exporting functions

module.exports = { validateMovieCreate, validateMovieUpdate };