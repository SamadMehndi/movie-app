// importing Movie model
const { Movie } = require('../model');

// defining MovieService
class MovieService {
  // creating movie
  static async createMovie(movieDetails) {
    return await Movie.create(
      movieDetails,
    );
  }

  // checking movie id exists in Db-movie collection or not
  static async checkMovieId(id) {
    return await Movie.findOne({
      movieId: id,
    });
  }

  // update movie
  static async updateMovie(id, body) {
    return await Movie.updateOne({ movieId: id }, { $set: body });
  }

  // get all movies
  static async getAllMovie() {
    return await Movie.find().sort({ movieId: 1 });
  }

  // get all details of a specific movie
  static async getSpecificMovieDetails(id) {
    return await Movie.findOne({
      movieId: id,
    });
  }

  // delete a specific movie by id
  static async deleteMovie(id) {
    return await Movie.findOneAndDelete({ movieId: id });
  }
}

// exporting MovieService
module.exports = MovieService;
