import { action, observable } from "mobx";
import UserService from "../service/UserService";
import ConversationService from "../service/ConversationService";

class ConversationStore {
  @observable conversations = [];
  @observable newMessages = 0;
  @observable lastOperation = "ERROR";

  @action
  getConversations() {
    UserService.getConversations().then(
      action("getConversations", data => {
        this.conversations = data;
      }),
      action("error", error => {
        console.log(error);
      })
    );
  }

  @action
  getAllConversations() {
    UserService.getAllConversations().then(
      action("getAllConversations", data => {
        this.conversations = data;
        this.lastOperation = "SUCCES";
      }),
      action("error", error => {
        console.log(error);
        this.lastOperation = "ERROR";
      })
    );
  }

  @action
  addConversation(body) {
    ConversationService.addConversation(body).then(
      action("addConversation", data => {
        this.conversations.push(data);
        this.lastOperation = "SUCCES";
      }),
      action("error", error => {
        console.log(error);
        this.lastOperation = "ERROR";
      })
    );
  }
}

export default new ConversationStore();
