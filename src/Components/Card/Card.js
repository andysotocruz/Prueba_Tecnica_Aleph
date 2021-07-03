import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const [name, setname] = useState(movie.Title.replaceAll(" ", "-"));

  return (
    <div className="card">
      <div className="card_poster">
        <img
          className="card_poster_img w-full h-full"
          src={movie.Poster}
          alt=""
        />
      </div>
      <div className="w-full d-flex justify-center items-center">
        <Link to={`/Details/${name}`} className="card_button link ">
          Detalles
        </Link>
      </div>
    </div>
  );
};

export default Card;
