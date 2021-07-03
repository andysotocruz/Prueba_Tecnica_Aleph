import React, { useState } from "react";
import AppRouter from "./Routers/AppRouter";
import MoviesContext from "./context/MoviesContext";

const App = () => {
  const [moviesState, setMoviesState] = useState({ movies: [], search: [] });

  return (
    <MoviesContext.Provider value={{ moviesState, setMoviesState }}>
      <AppRouter />
    </MoviesContext.Provider>
  );
};

export default App;
