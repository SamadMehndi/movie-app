// importing MovieService
const MovieService = require('../services/index');

// This function will delete the specific movie
const deleteMovies = async (req, res) => {
    try {
    // passing the id to delete the movie
        const deleteMovie = await MovieService.deleteMovie(req.params.id);

        // checking the movie is registered or not or already deleted
        if (deleteMovie == null) {
            return res.status(404).send({ message: 'This movie was not registered or already deleted.' });
        }

        // Sending response
        return res.status(200).send({ success: true, message: `This movie ID - ${req.params.id} has been successfully deleted.` });
    } catch (e) {
    // incase of error, sending the error as response as well as print the error in console
        console.log(e);
        res.status(500).send({ success: false, exception: e.message });
    }
};

// exporting the deleteMovies
module.exports = { deleteMovies };
