import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
};

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      return await api.register({ name, email, password });
    } catch (error) {
      return Promise.reject(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, asyncRegisterUser };
