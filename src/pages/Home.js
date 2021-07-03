import React, { useState, useEffect, useContext } from "react";
import Card from "../Components/Card/Card";
import { getAllMovies } from "../Helpers/Api";
import { movies as mock } from "../Utils/Movies";
import MoviesContext from "../context/MoviesContext";

const Home = () => {
  const { moviesState, setMoviesState } = useContext(MoviesContext);

  const moviesLocal = localStorage.getItem("movies");

  const getMovies = async () => {
    try {
      if (!moviesLocal) {
        const allMovies = await getAllMovies(mock);

        console.log(allMovies);

        localStorage.setItem("movies", JSON.stringify(allMovies));

        setMoviesState(
          Object.assign({}, moviesState, {
            movies: [...allMovies],
            search: [...allMovies],
          })
        );
      } else {
        setMoviesState(
          Object.assign({}, moviesState, {
            movies: [...JSON.parse(moviesLocal)],
            search: [...JSON.parse(moviesLocal)],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="container w-full d-flex justify-center items-stretch">
        <div className="movies_container d-flex justify-center items-center ">
          {moviesState.search
            .sort((a, b) => b.Ratings.good - a.Ratings.good)
            .map((ele) => (
              <Card key={ele.Title} movie={ele} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
