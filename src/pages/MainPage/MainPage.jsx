import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const MenuEntry = styled(Grid)``;

export function MainPage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container>
          <MenuEntry item xs>
            <Icon className="fas fa-envelope" />
            <span>
              <center>Wiadomości</center>
            </span>
          </MenuEntry>
          <MenuEntry item xs>
            <span>
              <center>Bank</center>
            </span>
          </MenuEntry>
          <MenuEntry item xs>
            <span>
              <center>Ustawienia</center>
            </span>
          </MenuEntry>
        </Grid>
      </div>
    </Container>
  );
}
