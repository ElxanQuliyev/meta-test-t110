import {
  CATALOG_LIST_FAIL,
  CATALOG_LIST_SUCCESS,
} from "../Constants/CatalogConstants";

export const catalogListReducer = (state = {}, action) => {
  switch (action.type) {
    case CATALOG_LIST_SUCCESS:
      return { catalogs: action.payload };
    case CATALOG_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
