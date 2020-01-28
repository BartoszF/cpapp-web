import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import UserService from "../../service/UserService";
import { ACCESS_TOKEN } from "../../constants";
import useStores from "../../useStores";
import ConversationStore from "../../stores/ConversationStore";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const AddConversationAction = observer(props => {
  const classes = useStyles();

  const [thisUser, setThisUser] = useState(0);
  const [otherUser, setOtherUser] = useState(0);

  const { userStore, conversationStore } = useStores();

  console.log(props);

  const addConversation = e => {
    e.preventDefault();
    console.log(e);
    const body = {userAId: thisUser, userBId: props.conversation}
    ConversationStore.addConversation(body);
  };

  const handleChange = v => {
    console.log(v);
    setThisUser(v.target.value)
  };

  const getUsers = users => {
    return users.map(user => (
      <option key={user.id} value={user.id}>
        {`${user.name} ${user.surename} (${user.pseudo})`}
      </option>
    ));
  };

  return (
    <form className={classes.form} onSubmit={addConversation}>
      <Select
        native
        fullWidth
        value={thisUser}
        onChange={handleChange}
        inputProps={{
          name: "other",
          id: "other-native"
        }}
      >
        {getUsers(userStore.users)}
      </Select>
      <Select
        native
        fullWidth
        value={props.conversation}
        onChange={handleChange}
        inputProps={{
          name: "this",
          id: "this-native"
        }}
      >
        {getUsers(userStore.users)}
      </Select>
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

export default AddConversationAction;
