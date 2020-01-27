import React, { useState, useEffect } from "react";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import InitPage from "./pages/InitPage/InitPage";

import userStore from "./stores/UserStore";
import conversationStore from "./stores/ConversationStore";
import messageStore from "./stores/MessageStore";

import AppHeader from "./components/AppHeader";
import MainPage from './pages/MainPage/MainPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AdminPage from './pages/AdminPage/AdminPage';
import { ACCESS_TOKEN } from './constants';
import PrivateRoute from './components/PrivateRoute';

const stores = {
  userStore,
  messageStore,
  conversationStore
};

function routing(role) {
  return (
    <Provider {...stores}>
      <Container component="main" maxWidth={role == "ADMIN" ? "xl" : "xs"}>
        <CssBaseline />
        <AppHeader />
        <Router>
          <Switch>
            <Route exact path="/" component={InitPage} />
            <PrivateRoute exact path="/main" component={MainPage} />
            <PrivateRoute exact path="/contacts" component={ContactPage} />
            <PrivateRoute exact path="/yup" component={AdminPage} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}

const App = observer(() => {

  const role = userStore.userData && userStore.userData.role ? userStore.userData.role : "NONE";

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN) && role == "NONE") {
      userStore.getUserData();
    }
  })


  return routing(role);
})


export default App;
