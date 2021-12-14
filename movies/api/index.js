// importing all functions
const { createMovies } = require('./post');
const { getAllMovies, getSpecificMovie } = require('./get');
const { updateMovies } = require('./put');
const { deleteMovies } = require('./delete');

// exporting all functions
module.exports = {
    createMovies, getAllMovies, getSpecificMovie, updateMovies, deleteMovies,
};
