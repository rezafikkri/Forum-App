import { ActionType } from "./action";

const initialValue = {
  values: ['all'],
  categorySelected: 'all',
};

function categoriesReducer(categories = initialValue, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return {
        ...categories,
        values: [ ...categories.values, ...action.payload.categories.values ]
      };

    default:
      return categories;
  }
}

export default categoriesReducer;
