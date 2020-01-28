import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import UserService from "../../service/UserService";
import { ACCESS_TOKEN } from "../../constants";
import useStores from "../../useStores";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const AddUserAction = observer(props => {
  const classes = useStyles();

  const {userStore} = useStores();

  const addUser = e => {
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.target);
    let body = {
      phoneNumber: data.get("phoneNumber"),
      pin: data.get("pin"),
      name: data.get("name"),
      surename: data.get("surename"),
      pseudo: data.get("pseudo"),
      description: data.get("description"),
    };

    UserService.addUser(body).then(user => {
        userStore.getAllUsers();
    }).catch(err => {
        console.log(err);
    })
  };

  return (
    <form className={classes.form} onSubmit={addUser}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="name"
        label="Imie"
        name="name"
        type="text"
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="surename"
        label="Nazwisko"
        name="surename"
        type="text"
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="pseudo"
        label="Pseudonim"
        name="pseudo"
        type="text"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="Numer"
        name="phoneNumber"
        type="number"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="pin"
        label="PIN"
        name="pin"
        type="number"
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="description"
        label="Opis"
        name="description"
        type="text"
      />
      <Button
        className={classes.submit}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Dodaj
      </Button>
    </form>
  );
});

export default AddUserAction;
