import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import CardMovie from "./CardMovie";

function App() {
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const [wishListData, setWishListData] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch("/new-movies");
      var response = await rawResponse.json();
      setMovieData(response.results);
    }
    loadData();

    async function loadWishList() {
      var rawWish = await fetch("/wishlist-movie");
      var responseWish = await rawWish.json();
      var table = [];
      for (let i = 0; i < responseWish.length; i++) {
        table.push({
          movieName: responseWish[i].name,
          movieImg: responseWish[i].img,
        });
      }
      setFavoriteMovieList(table);
      console.log("responseWish", responseWish);
    }
    loadWishList();
  }, []);

  /* var movieData = [
    {name:"Star Wars : L'ascension de Skywalker", desc:"La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img:"/starwars.jpg", note:6.7, vote:5},
    {name:"Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img:"/maleficent.jpg", note:8.2, vote:3},
    {name:"Jumanji: The Next Level", desc: "L’équipe est de retour, mais le jeu a changé. Alors qu’ils retournent dans Jumanji pour secourir ...", img:"/jumanji.jpg", note:4, vote:5},
    {name:"Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton – star déclinante d'une série télévisée de western – et Cliff Booth ...", img:"/once_upon.jpg", note:6, vote:7},
    {name:"La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d’Arendelle à la recherche de réponses ...", img:"/frozen.jpg", note:4.6, vote:3},
    {name:"Terminator: Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img:"/terminator.jpg", note:6.1, vote:1},
  ] */

  var handleClickAddMovie = async (movieName, movieImg) => {
    setMoviesCount(moviesCount + 1);
    setFavoriteMovieList([...favoriteMovieList, { movieName, movieImg }]);
    await fetch("/wishlist-movie", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `title=${movieName}`,
    });
    console.log("favoriteMovieList", favoriteMovieList);
  };

  var handleClickDeleteMovie = async (movieName, movieImg) => {
    setMoviesCount(moviesCount - 1);
    setFavoriteMovieList(
      favoriteMovieList.filter((e) => e.movieName !== movieName)
    );
    await fetch(`/wishlist-movie/:${movieName}`, {
      method: "DELETE",
    });
  };

  var movieList = movieData.map(function (movie, i) {
    return (
      <CardMovie
        key={i}
        deleteMovie={handleClickDeleteMovie}
        addMovie={handleClickAddMovie}
        movieName={movie.title}
        movieDesc={movie.overview}
        movieImg={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        globalRating={movie.vote_average}
        globalCountRating={movie.vote_count}
      />
    );
  });

  return (
    <div className="bgc">
      <Navbar moviesCount={moviesCount} favoriteMovieList={favoriteMovieList} />
      <div className="mainContainer">
        <div>
          <h1 className="mainTitle">
            Le petit streamer <br></br>du 34
          </h1>
        </div>

        <div className="flexrow">{movieList}</div>
      </div>
    </div>
  );
}

export default App;
