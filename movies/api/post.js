// importing MovieService and middleware
const MovieService = require('../services/movieService');
const { validateMovieCreate } = require('../validation/validate');

// this function is creating movie
const createMovies = async (req, res) => {
    // console.log("Movie Details:",req.body);
    // validating movie details
    const { error } = validateMovieCreate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    try {
    // checking whether movie id already exists or not
        const notCreateMovie = await MovieService.checkMovieId(req.body.movieId);
        if (notCreateMovie !== null) {
            return res.status(404).send({ message: 'This movie is already registered.' });
        }
        // else add movie details
        const movieDetails = {
            movieId: req.body.movieId,
            movieName: req.body.movieName,
            movieGenre: req.body.movieGenre,
            movieDescription: req.body.movieDescription,
        };
        // console.log("movieDetails",movieDetails);

        // new movie adding and sending response
        const createMovie = await MovieService.createMovie(movieDetails);
        return res.status(200).send({ success: true, payload: createMovie, message: 'New Movie Added.' });
    } catch (err) {
    // In case of an error sending that error as response
        console.log(err);
        return res.status(500).send({ success: false, exception: err.message });
    }
};

// exporting the createMovie function
module.exports = { createMovies };
