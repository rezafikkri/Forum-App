import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const store = configureStore({
  reducer: {
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
