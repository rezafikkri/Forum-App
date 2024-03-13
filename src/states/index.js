import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import categoriesReducer from './categories/reducer';
import detailThreadReducer from './detailThread/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    categories: categoriesReducer,
    loadingBar: loadingBarReducer,
    detailThread: detailThreadReducer,
  },
});

export default store;
