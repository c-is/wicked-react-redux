import { RECEIVE_USERS } from '../actions';

const users = (state, { type, result, status, statusText }) => {
  switch (type) {
    case RECEIVE_USERS:
      return {
        ...state,
        result, status, statusText,
      };
    default:
      return state || {};
  }
}

export default users;
