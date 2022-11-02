var mongoose = require('mongoose');

var moviesSchema = mongoose.Schema({
    name: String,
    description: String,
    img: String,
    note: Number,
    vote: Number,
})

var moviesModel = mongoose.model('movies', moviesSchema);

// var favoriteMovieSchema = mongoose.Schema({
//     name: String,
// })

// var favoriteMoviesModel = mongoose.model('movies', favoriteMovieSchema);




module.exports = moviesModel;