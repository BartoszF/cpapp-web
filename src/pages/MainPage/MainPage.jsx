import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {});

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <MenuEntry className={classes.paper}>
        <Grid container>
          <MenuEntry item xs>
            <center>
              <FontAwesomeIcon icon={faEnvelope} size="3x" />
            </center>
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
      </MenuEntry>
    </Container>
  );
}
