import { action, observable } from "mobx";
import UserService from "../service/UserService";

class UserStore {
  @observable userData = {};

  @observable users = [];

  @action setUser(userData) {
    this.userData = userData;
  }

  @action
  getUserData() {
    UserService.getCurrentUser().then(
      action("getUserData", user => {
        this.userData = user;
      }),
      action("error", error => {
        console.log(error);
      })
    );
  }

  @action
  addContact(number) {
    UserService.addContact(number).then(
      action("addContact", user => {
        this.userData = user;
      }),
      action("error", error => {
        console.log(error);
      })
    );
  }

  @action
  getAllUsers() {
    UserService.getAllUsers().then(
      action("getAllUsers", users => {
        this.users = users;
      }),
      action("error", error => {
        console.log(error);
      })
    );
  }
}

export default new UserStore();
