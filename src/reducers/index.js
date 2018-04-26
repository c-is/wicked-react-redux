import { combineReducers } from 'redux';

import users from './users';


const appReducer = combineReducers({
  users,
});

const rootReducer = (state, action = {}) => {
  if (action.type === 'CLEAR_DATA') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;

