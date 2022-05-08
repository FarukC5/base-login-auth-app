const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  registered: false
};

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case 'REGISTERED':
      return {
        ...state,
        registered: action.payload
      };
    default:
      return state;
  }
};