const initialState = {};

export const errorsReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ERRORS':
      return action.payload;
    default:
      return state;
  }
};