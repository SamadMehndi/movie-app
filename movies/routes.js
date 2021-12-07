//importing functions
const { Router } = require('express');
const movieRouter = Router();
const { createMovies, updateMovies, getAllMovies, getSpecificMovie, deleteMovies} = require('./api/index');
const { verifyAdmin, verifyAdminUser } = require('../middlewares/userAuth');

// defining routes
movieRouter.post('/create', verifyAdmin, createMovies);
movieRouter.put('/update/:id',verifyAdmin, updateMovies);
movieRouter.get('/allmovies',verifyAdminUser, getAllMovies);
movieRouter.get('/specificmovie/:id',verifyAdminUser, getSpecificMovie);
movieRouter.delete('/delete/:id',verifyAdmin, deleteMovies);

// exporting movieRouter
module.exports = { movieRouter };
