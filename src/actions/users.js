import axios from 'axios';
import { apiBaseURL } from '../constants';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
  };
}

export function receiveUsers(d) {
  const result = d && d.data.result;
  const { status, statusText } = d;

  return {
    type: RECEIVE_USERS,
    result, status, statusText,
  };
}

export const getUsers = () => dispatch => {
  dispatch(requestUsers());

  const requestData = {
    url: apiBaseURL.users,
    method: 'GET',
  };

  axios({
    url: requestData.url,
    method: requestData.method,
    data: requestData.data,
  }).then((users) => {
    dispatch(receiveUsers(users));
    return Promise.resolve();
  }).catch((error) => {
    dispatch(receiveUsers(error.response));
  });
};
