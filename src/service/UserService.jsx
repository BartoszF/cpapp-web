import { ACCESS_TOKEN } from '../constants';
import { request } from './APIUtils';

const UserService = {
  login(loginRequest) {
    return request({
      url: '/auth/signin',
      method: 'POST',
      body: JSON.stringify(loginRequest),
    });
  },

  signup(signupRequest) {
    return request({
      url: '/auth/signup',
      method: 'POST',
      body: JSON.stringify(signupRequest),
    });
  },

  getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }

    return request({
      url: '/user/me',
      method: 'GET',
    });
  },

  getAllUsers() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }

    return request({
      url: '/user/',
      method: 'GET',
    });
  },

  getUserProfile(username) {
    return request({
      url: `/users/${username}`,
      method: 'GET',
    });
  },

  addContact(contactNumber) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }

    return request({
      url: '/user/me/contact',
      method: 'POST',
      body: JSON.stringify({contactNumber: contactNumber}),
    });
  },

  getConversations() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }

    return request({
      url: '/user/me/conversations',
      method: 'GET',
    });
  }
};

export default UserService;