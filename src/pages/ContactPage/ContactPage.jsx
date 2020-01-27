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
import UserService from '../../service/UserService';

const convertContactToListItem = contact => {
  return (
    <ListItem>
      <ListItemText primary="Single-line item" />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <FontAwesomeIcon icon={faComment} size="3x" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const ContactAdderBar = styled(Grid)`
  position: absolute;
  bottom: 0;
  padding: 0;
  margin:0;
  padding-top: 10px;
  padding-bottom: 10px;
  width:100%;
`;

const AddButtonGrid = styled(Grid)`
    margin-top:auto;
    margin-left:auto;
    margin-right:auto;
`

const ContactPage = observer(props => {
  const { userStore } = useStores();
  const [number, setNumber] = useState("");

  useEffect(() => {});

  const onAddClicked = (ref) => {
      userStore.addContact(number);
  }

  const onTextChanged = (event) => {
      setNumber(event.target.value);
  }

  return (
    <div>
      <List dense={false}>
        {userStore.userData.contacts ? (
          userStore.userData.contacts.map(contact =>
            convertContactToListItem(contact)
          )
        ) : (
          <ListItem>
            <ListItemText primary="No contacts" />
          </ListItem>
        )}
      </List>
      <ContactAdderBar container>
        <Grid item>
          <TextField onChange={onTextChanged} margin="dense" id="standard-basic" label="Phone number" />
        </Grid>
        <AddButtonGrid item>
          <Button onClick={onAddClicked} variant="contained" color="primary">
            Add
          </Button>
        </AddButtonGrid>
      </ContactAdderBar>
    </div>
  );
});

export default ContactPage;
