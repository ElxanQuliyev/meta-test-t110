import { CATEGORY_LIST_FAIL, CATEGORY_LIST_SUCCESS } from "../Constants/CategoryConstants";

// ALL PRODUCTS
export const categoryListReducer = (state = { }, action) => {
    switch (action.type) {
      case CATEGORY_LIST_SUCCESS:
        return {  categories: action.payload };
      case CATEGORY_LIST_FAIL:
        return {  error: action.payload };
      default:
        return state;
    }
  };