const { Router } = require('express');
var express = require('express');
var router = express.Router();
var request = require("sync-request");
var moviesModel = require('../models/movies');

var movieList = [];


/* GET home page. */
router.get('/',async function(req, res, next) {
  let movies = await  moviesModel.find();

  res.json(movies);
});




//Récupérer les films via l’API.
router.get('/new-movies', function (req, res, next) {
  var title = req.query.name
  var requete = request("GET", `https://api.themoviedb.org/3/discover/movie?api_key=734aeaed4d5fc6c718957f29dab7480a&language=fr-FR&sort_by=popularity.desc`);
  var dataApi = JSON.parse(requete.body)
  res.json(dataApi);

  });

//Ajouter des films à la wish list 

  router.post("/wishlist-movie", async function(req, res, next) {
    var title = req.body.title
  var requete = request("GET", `https://api.themoviedb.org/3/search/movie?api_key=734aeaed4d5fc6c718957f29dab7480a&language=fr-FR&query=${title}&include_adult=false`);
  var dataApi = JSON.parse(requete.body)

   if(dataApi.results.length !== 0){

      var newMovie = new moviesModel ({
        name: dataApi.results[0].title,
        img: "https://image.tmdb.org/t/p/w500/"+dataApi.results[0].poster_path,
        description: dataApi.results[0].overview,
        note: dataApi.results[0].vote_average,
        vote: dataApi.results[0].vote_count,
        });

    var movieSaved = await newMovie.save();
   }
  
    res.json(movieSaved);
  });


//Suppression d'un élément dans la liste de mongo db
  router.delete("/wishlist-movie/:name", async function(req, res, next) {

    var returnDb = await moviesModel.deleteOne({movieName : req.params.name})
 
     var result =  false
 
 if (returnDb.deletedCount== 1){result = true}
   //deletedCount => nombre d'éléments réussis à etre supprimer pas mongodb
     res.json(result);
   });

router.get('/wishlist-movie', async function(req, res,next) {
  var movies = await moviesModel.find()

  res.json(movies);


  })

module.exports = router;
