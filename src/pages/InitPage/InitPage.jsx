import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import UserService from "../../service/UserService";
import { ACCESS_TOKEN } from "../../constants";

import { observer } from "mobx-react";
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

const ErrorDiv = styled.div`
  background-color: rgba(255, 35, 35, 0.5);
  border: 1px solid rgba(195, 10, 10, 0.9);
  padding: 5px;
  font-size: 12px;
`;

const InitPage = observer(props => {
  const classes = useStyles();

  const { userStore } = useStores();

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      props.history.push("/main");
    }
  });

  let [error, setError] = useState(null);

  const login = e => {
    if (e) e.preventDefault();
    const data = new FormData(e.target);
    let body = { number: data.get("phoneNumber"), pin: data.get("pin") };
    UserService.login(body)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        userStore.getUserData();
        props.history.push("/main");
      })
      .catch(err => {
        console.error(err);
        setError("Wrong credentials or number doesn't exists");
      });
  };

  const errorDiv = () => {
    if (error) return <ErrorDiv>{error}</ErrorDiv>;
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={login} noValidate>
        {errorDiv()}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Twój numer"
          name="phoneNumber"
          type="number"
          autoComplete="phoneNumber"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="pin"
          label="Pin"
          type="password"
          id="pin"
        />
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Zaloguj się
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/createAccount" variant="body2">
              {"Nie masz numeru?"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
});

export default InitPage;
