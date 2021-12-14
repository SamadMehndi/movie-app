// importing MovieService
const MovieService = require('../services/index');

// getting all movies list
const getAllMovies = async (req, res) => {
    try {
    // get all movies
        const movies = await MovieService.getAllMovie();

        // sending response
        return res.status(200).send({ success: true, payload: { Movies: movies } });
    } catch (e) {
    // in case of error sending the error as response
        console.log(e);
        res.status(500).send({
            message: 'Error -> Can not complete a paging request!',
            error: e.message,
        });
    }
};

// getting specific movie detail
const getSpecificMovie = async (req, res) => {
    try {
    // passing id to get the specific movie
        const movie = await MovieService.getSpecificMovieDetails(req.params.id);

        // checking if the movie is present or not
        if (movie === null) {
            return res.status(404).send({ message: 'This movie is not present. ' });
        }

        // else sending the movie as response
        return res.status(200).send({ success: true, payload: movie });
    } catch (e) {
    // incase of an error, sending the error as the response as well as print the error in console
        console.log(e);
        res.status(500).send({
            message: `Not able to fetch the movie! Maybe this Movie ID - ${req.params.id} does not exists.`,
        });
    }
};

// exporting all functions
module.exports = { getAllMovies, getSpecificMovie };
