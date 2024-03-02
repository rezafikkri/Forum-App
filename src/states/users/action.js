import api from '../../utils/api';

const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
};

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, asyncRegisterUser };
