import {

  CATALOG_CREATE_FAIL,
  CATALOG_CREATE_REQUEST,
  CATALOG_CREATE_RESET,
  CATALOG_CREATE_SUCCESS,
  CATALOG_EDIT_FAIL,
  CATALOG_EDIT_REQUEST,
  CATALOG_EDIT_SUCCESS,
  CATALOG_LIST_FAIL,
  CATALOG_LIST_SUCCESS,
  CATALOG_UPDATE_FAIL,
  CATALOG_UPDATE_REQUEST,
  CATALOG_UPDATE_RESET,
  CATALOG_UPDATE_SUCCESS,
} from "../Constants/CatalogConstants";

export const catalogListReducer = (state = {catalogs:[]}, action) => {
  switch (action.type) {
    case CATALOG_LIST_SUCCESS:
      return { catalogs: action.payload };
    case CATALOG_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

// Create Catalog
export const catalogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATALOG_CREATE_REQUEST:
      return { loading: true };
    case CATALOG_CREATE_SUCCESS:
      return { loading: false, success: true, catalog: action.payload };
    case CATALOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATALOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// EDIT PRODUCT
export const catalogEditReducer = (
  state = { catalog: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CATALOG_EDIT_REQUEST:
      return { ...state, loading: true };
    case CATALOG_EDIT_SUCCESS:
      return { loading: false, catalog: action.payload };
    case CATALOG_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const catalogUpdateReducer = (state = { catalog: {} }, action) => {
  switch (action.type) {
    case CATALOG_UPDATE_REQUEST:
      return { loading: true };
    case CATALOG_UPDATE_SUCCESS:
      return { loading: false, success: true, catalog: action.payload };
    case CATALOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATALOG_UPDATE_RESET:
      return { catalog: {} };
    default:
      return state;
  }
};
