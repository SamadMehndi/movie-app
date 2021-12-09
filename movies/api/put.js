// importing functions
const MovieService = require('../services/index');

// this function will update movies
const updateMovies = async (req, res) => {
  try {
    // movie id which is not present in movie collection can not be updated
    const notUpdateMovie = await MovieService.checkMovieId(req.params.id);
    if (notUpdateMovie === null) {
      return res.status(404).send({ message: 'This movie is not registered.' });
    }

    // Taking movie details to be updated
    const movieDetails = {
      movieName: req.body.movieName,
      movieGenre: req.body.movieGenre,
      movieDescription: req.body.movieDescription,
    };

    // updating movie and sending response
    const updateMovieDetails = await MovieService.updateMovie(req.params.id, movieDetails);
    return res.status(200).send({ success: true, message: 'Movie Details have been updated successfully.' });
  } catch (e) {
    // incase of error, sending the error as response as well as print the error in console
    console.log(e);
    return res.status(500).send({ success: false, exception: e.message });
  }
};

// exporting the updateMovie
module.exports = { updateMovies };
