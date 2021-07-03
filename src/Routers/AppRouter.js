import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";
import NavBar from "../Components/NavBar/NavBar";

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Details/:name" component={Details} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
