import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import InitPage from "./pages/InitPage/InitPage";
import { MainPage } from "./pages/MainPage/MainPage";

function routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={InitPage} />
        <Route exact path="/main" component={MainPage} />
      </Switch>
    </Router>
  );
}

function App() {
  return routing();
}

export default App;
