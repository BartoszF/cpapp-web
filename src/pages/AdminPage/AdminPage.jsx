import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../useStores";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../service/UserService";

import AddUserAction from './AddUserAction';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  }
}));

const convertContactToListItem = contact => {
  return (
    <ListItem key={contact.number}>
      <ListItemText
        primary={
          contact.name + " " + contact.surename + " (" + contact.pseudo + ")"
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <FontAwesomeIcon icon={faComment} size="sm" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const getCurrentActionPane = (action) => {
  switch(action){
    case "ADD_USER":
      return <AddUserAction />
    default:
      return (<div></div>)
  }
}

const AdminPage = observer(props => {
  const classes = useStyles();
  const { userStore } = useStores();
  const [number, setNumber] = useState("");
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (users.length == 0) {
      UserService.getAllUsers().then(users => {
        setUsers(users);
      });
    }
  });

  const onAddClicked = () => {
    setAction("ADD_USER");
    console.log("ADD")
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xl={3}>
          <h2>Conversations</h2>
          <div>TUTAJ COŚ BĘDZIE</div>
        </Grid>
        <Grid item xl={3}>
          <h2>Persons</h2>
          <List dense={false}>
            {users.map(contact => convertContactToListItem(contact))}
            <ListItem key="addNew">
              <ListItemText
                primary="Add new"
              />
              <ListItemSecondaryAction>
                <IconButton onClick={onAddClicked} edge="end" aria-label="add">
                  +
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xl={6}>
          <h2>Details</h2>
          {getCurrentActionPane(action)}
        </Grid>
      </Grid>
    </div>
  );
});

export default AdminPage;
