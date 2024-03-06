import { ActionType } from "./action";

const initialValue = {
  values: ['all'],
  selected: 'all',
};

function categoriesReducer(categories = initialValue, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.payload.categories;

    default:
      return categories;
  }
}

export default categoriesReducer;
