// importing mongoose
const mongoose = require('mongoose');

// Defining schema
const movieSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true,
        unique: true,
    },
    movieName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    movieGenre: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    movieDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
}, { timestamps: true });

// renaming the collection
const Movie = mongoose.model('Movie', movieSchema, 'Movie');

// exporting movie
module.exports = Movie;
