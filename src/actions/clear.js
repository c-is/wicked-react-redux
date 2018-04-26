export const clearState = () => dispatch => {
  dispatch({ type: 'CLEAR_DATA'});
  return Promise.resolve();
};
