import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
