import { action, observable } from 'mobx';
import UserService from "../service/UserService";

class ConversationStore {
    @observable conversations = [];
    @observable newMessages = 0;

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
}

export default new ConversationStore();