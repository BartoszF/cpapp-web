import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

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

export default function InitPage(props) {
  const classes = useStyles();
  //const [count, setCount] = useState(0);
  console.log(props);

  useEffect(() => {
    //document.title = `Kliknięto ${count} razy`;
  });

  const login = (e) => {
    if(e) e.preventDefault();
    console.log(e);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={login} noValidate>
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
    </Container>
  );
}
