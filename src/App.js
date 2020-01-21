import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { observer, Provider } from 'mobx-react';
import InitPage from "./pages/InitPage/InitPage";
import { MainPage } from "./pages/MainPage/MainPage";

import userStore from "./stores/UserStore";

const stores = {
  userStore
};

function routing() {
  return (
    <Provider {...stores}>
      <Router>
        <Switch>
          <Route exact path="/" component={InitPage} />
          <Route exact path="/main" component={MainPage} />
        </Switch>
      </Router>
    </Provider>
  );
}


function App() {
  return routing();
}

export default observer(App);
