import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../Helpers/Api";

const Details = () => {
  const [DetailsState, setDetailsState] = useState();

  const { name } = useParams();

  const movies = JSON.parse(localStorage.getItem("movies"));

  const movie = movies.filter(
    (movie) => movie.Title === name.replaceAll("-", " ")
  )[0];

  const fetchMovie = async () => {
    try {
      const data = await getMovie(name.replaceAll("-", " "));

      const newMovie = { ...movie, ...data };

      const newMovies = movies.map((movie) => {
        if (movie.Title === newMovie.Title) {
          return newMovie;
        } else {
          return movie;
        }
      });

      localStorage.setItem("movies", JSON.stringify(newMovies));

      setDetailsState(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Object.keys(movie).includes("voted")) {
      fetchMovie();
    } else {
      setDetailsState(movie);
    }
  }, []);

  const handleVote = () => {
    movie.voted = true;

    const newMovies = movies.map((old) => {
      if (old.Title === name) {
        return movie;
      } else {
        return old;
      }
    });

    localStorage.setItem("movies", JSON.stringify(newMovies));

    setDetailsState(movie);
  };

  const like = () => {
    movie.Ratings.good++;

    handleVote();
  };

  const dislike = () => {
    movie.Ratings.bad++;

    handleVote();
  };

  return (
    <>
      <div className="container_movie d-flex flex-wrap w-full h-full justify-center items-center ">
        <div className="card_poster card_poster_details d-flex flex-wrap h-full  justify-center items-center ">
          <img
            className="card_poster_img w-full h-full"
            src={DetailsState?.Poster}
            alt=""
          />
          <div className="w-full d-flex justify-around">
            {DetailsState?.voted ? (
              <p>¡Felicidades tu voto ha sido realizado!</p>
            ) : (
              <>
                <button
                  className="card_button card_button_action card_button_like"
                  onClick={like}
                >
                  I like
                </button>
                <button
                  className="card_button card_button_action card_button_dislike"
                  onClick={dislike}
                >
                  I don`t like it
                </button>
              </>
            )}
          </div>
        </div>
        <div className="container_details">
          <div className="genre d-flex justify-center items-center">
            <p className="paragraph">Title: {DetailsState?.Title}</p>
            <p className="paragraph">Genero: {DetailsState?.Genre}</p>
            <p className="paragraph">Stars: {DetailsState?.Actors}</p>
          </div>
          <div className="genre d-flex items-center justify-center">
            <p className="paragraph">Year: {DetailsState?.Released}</p>
            <p className="paragraph">Duration: {DetailsState?.Runtime}</p>
            <p className="paragraph">Director: {DetailsState?.Director}</p>
          </div>
          <div className="description_container genre items-center d-flex">
            <span className="description">Plot: {DetailsState?.Plot}</span>
          </div>
          <div className="genre d-flex justify-center items center">
            <p className="paragraph">
              Rating good: {DetailsState?.Ratings.good}
            </p>
            <p className="paragraph">Rating bad: {DetailsState?.Ratings.bad}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
