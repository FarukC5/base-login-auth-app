import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';

export const setErrors = (error) => {
  return {
    type: 'GET_ERRORS',
    payload: error.response.data
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: decoded
  };
};

export const registerSuccess = (registered) => {
  return {
    type: 'REGISTERED',
    payload: registered
  };
};

export const registerUser = (userData) => (dispatch) => {
  dispatch(setErrors({ response: { data: {} } }));
  axios
    .post('/api/users/register', userData)
    .then((res) => dispatch(registerSuccess(res)))
    .catch((error) => dispatch(setErrors(error)));
};

export const loginUser = (userData) => (dispatch) => {
  dispatch(setErrors({ response: { data: {} } }));
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => dispatch(setErrors(error)));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};