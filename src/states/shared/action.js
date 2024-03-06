import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveCategoriesActionCreator } from "../categories/action";

function asyncPopulateUsersThreadsAndCategories() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const categories = api.getAllCategories(threads);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveCategoriesActionCreator(categories));
    } catch (error) {
      return Promise.reject(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersThreadsAndCategories };
