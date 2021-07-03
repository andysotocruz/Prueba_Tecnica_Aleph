import { createContext } from "react";

const MoviesContext = createContext({ movies: [], updateMovies: () => {} });

export default MoviesContext;
