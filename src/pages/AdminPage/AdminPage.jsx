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

import AddUserAction from "./AddUserAction";
import ConversationStore from "../../stores/ConversationStore";
import AddConversationAction from "./AddConversationAction";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  }
}));

const convertContactToListItem = (contact, convAction) => {
  return (
    <ListItem key={contact.number}>
      <ListItemText
        primary={
          contact.name + " " + contact.surename + " (" + contact.pseudo + ")"
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => convAction(contact.id)}
          edge="end"
          aria-label="delete"
        >
          <FontAwesomeIcon icon={faComment} size="sm" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const getCurrentActionPane = (action, props) => {
  switch (action) {
    case "ADD_USER":
      return <AddUserAction {...props} />;
    case "ADD_CONVERSATION":
      return <AddConversationAction {...props} />;
    default:
      return <div>{action}</div>;
  }
};

const AdminPage = observer(props => {
  const classes = useStyles();
  const { userStore, conversationStore } = useStores();
  const [conversation, setConversation] = useState(0);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (userStore.users.length == 0) {
      UserService.getAllUsers().then(users => {
        userStore.users = users;
      });
    }

    if (
      conversationStore.conversations.length === 0 &&
      conversationStore.lastOperation != "SUCCESS"
    ) {
      ConversationStore.getAllConversations();
    }
  });

  const onAddClicked = () => {
    setAction("ADD_USER");
    console.log("ADD");
  };

  const conversationButton = convId => {
    console.log(convId);
    let selectedConv = conversationStore.conversations.filter(
      conv => conv.user_id == convId
    );
    console.log(selectedConv);

    if (selectedConv.length === 0) {
      setConversation(convId);
      setAction("ADD_CONVERSATION");
    } else {
      const conv = selectedConv[0];
      setConversation(convId);
      setAction("CONVERSATION");
    }
  };

  //TODO: Move to component
  const conversationList = () => {
    return conversationStore.conversations.map(c => <div>{c.id}</div>);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={3}>
          <h2>Conversations</h2>
          <div>{conversationList()}</div>
        </Grid>
        <Grid item sm={3}>
          <h2>Persons</h2>
          <List dense={false}>
            {userStore.users.map(contact =>
              convertContactToListItem(contact, conversationButton)
            )}
            <ListItem key="addNew">
              <ListItemText primary="Add new" />
              <ListItemSecondaryAction>
                <IconButton onClick={onAddClicked} edge="end" aria-label="add">
                  +
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={6}>
          <h2>
            <Button onClick={() => setAction("")}>X</Button> Details
          </h2>
          {getCurrentActionPane(action, { conversation: conversation })}
        </Grid>
      </Grid>
    </div>
  );
});

export default AdminPage;
