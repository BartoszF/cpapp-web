import { ACCESS_TOKEN } from '../constants';
import { request } from './APIUtils';

const ConversationService = {

  addConversation(conversation) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }

    return request({
      url: '/conversation',
      method: 'POST',
      body: JSON.stringify(conversation),
    });
  },
};

export default ConversationService;