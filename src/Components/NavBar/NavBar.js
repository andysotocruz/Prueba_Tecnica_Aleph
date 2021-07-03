import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";

const NavBar = () => {
  const [formState, setFormState] = useState({ busqueda: "" });

  const { moviesState, setMoviesState } = useContext(MoviesContext);

  const handleChange = ({ target: { name, value } }) => {
    setFormState(Object.assign({}, formState, { [name]: value }));

    const search = moviesState.movies.filter((movie) =>
      movie.Title.toLowerCase().includes(value)
    );

    setMoviesState(Object.assign({}, moviesState, { search: [...search] }));
  };
  return (
    <div className="nav d-flex justify-center items-center w-full">
      <div className="nav_title w-full">
        <p>
          <Link className="link" to="/">
            Peliculas más populares del 2021
          </Link>
        </p>
      </div>
      <div className="nav_search w-full d-flex justify-center">
        <input
          className="search"
          type="text"
          value={formState.busqueda}
          name="busqueda"
          onChange={handleChange}
          placeholder="Buscar"
        />
      </div>
    </div>
  );
};

export default NavBar;
