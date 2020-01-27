import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faDollarSign,
  faCogs,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Grid, Badge } from "@material-ui/core";
import { observer } from "mobx-react";
import useStores from "../../useStores";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const MenuEntry = styled(Grid)`
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;

  background: rgba(212, 210, 212, 1);
  background: -moz-linear-gradient(
    315deg,
    rgba(212, 210, 212, 1) 0%,
    rgba(235, 235, 235, 1) 38%,
    rgba(230, 230, 230, 1) 71%,
    rgba(209, 209, 209, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(212, 210, 212, 1)),
    color-stop(38%, rgba(235, 235, 235, 1)),
    color-stop(71%, rgba(230, 230, 230, 1)),
    color-stop(100%, rgba(209, 209, 209, 1))
  );
  background: -webkit-linear-gradient(
    315deg,
    rgba(212, 210, 212, 1) 0%,
    rgba(235, 235, 235, 1) 38%,
    rgba(230, 230, 230, 1) 71%,
    rgba(209, 209, 209, 1) 100%
  );
  background: -o-linear-gradient(
    315deg,
    rgba(212, 210, 212, 1) 0%,
    rgba(235, 235, 235, 1) 38%,
    rgba(230, 230, 230, 1) 71%,
    rgba(209, 209, 209, 1) 100%
  );
  background: -ms-linear-gradient(
    315deg,
    rgba(212, 210, 212, 1) 0%,
    rgba(235, 235, 235, 1) 38%,
    rgba(230, 230, 230, 1) 71%,
    rgba(209, 209, 209, 1) 100%
  );

  margin: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  min-width: 100px;
  max-width: 100px;
`;

const MainPage = observer((props) => {
  const classes = useStyles();

  useEffect(() => {
    conversationStore.getConversations();
  });

  const { messageStore, userStore, conversationStore } = useStores();

  return (
    <div className={classes.paper}>
      <Grid container>
        <MenuEntry item xs>
          <center>
            <Badge badgeContent={conversationStore.newMessages} color="secondary">
              <FontAwesomeIcon icon={faEnvelope} size="3x" />
            </Badge>
          </center>
          <span>
            <center>Wiadomości</center>
          </span>
        </MenuEntry>

        <MenuEntry item xs>
          <center>
            <FontAwesomeIcon icon={faUsers} size="3x" />
          </center>
          <span>
            <center>Kontakty</center>
          </span>
        </MenuEntry>
        <MenuEntry item xs>
          <center>
            <FontAwesomeIcon icon={faDollarSign} size="3x" />
          </center>
          <span>
            <center>Bank</center>
          </span>
        </MenuEntry>
        <MenuEntry item xs>
          <center>
            <FontAwesomeIcon icon={faCogs} size="3x" />
          </center>
          <span>
            <center>Ustawienia</center>
          </span>
        </MenuEntry>
      </Grid>
    </div>
  );
});

export default MainPage;
