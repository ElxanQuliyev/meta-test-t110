import {
    SERIE_CREATE_FAIL,
    SERIE_CREATE_REQUEST,
    SERIE_CREATE_RESET,
    SERIE_CREATE_SUCCESS,
    SERIE_DELETE_FAIL,
    SERIE_DELETE_REQUEST,
    SERIE_DELETE_SUCCESS,
    SERIE_EDIT_FAIL,
    SERIE_EDIT_REQUEST,
    SERIE_EDIT_SUCCESS,
    SERIE_LIST_FAIL,
    SERIE_LIST_REQUEST,
    SERIE_LIST_SUCCESS,
    SERIE_UPDATE_FAIL,
    SERIE_UPDATE_REQUEST,
    SERIE_UPDATE_RESET,
    SERIE_UPDATE_SUCCESS,
  } from "../Constants/SeriesConstants";
//   import { FILM_BACKIMAGE_FAIL, FILM_BACKIMAGE_REQUEST, FILM_BACKIMAGE_SUCCESS, FILM_IMAGE_FAIL, FILM_IMAGE_REQUEST, FILM_IMAGE_SUCCESS } from "../Constants/ProductImageConstants";
  
  // ALL PRODUCTS
  export const serieListReducer = (state = { series: [] }, action) => {
    switch (action.type) {
      case SERIE_LIST_REQUEST:
        return { loading: true, series: [] };
      case SERIE_LIST_SUCCESS:
        return { loading: false, series: action.payload };
      case SERIE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  
  
  // DELETE PRODUCT
  export const serieDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SERIE_DELETE_REQUEST:
        return { loading: true };
      case SERIE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SERIE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Create PRODUCT
  export const serieCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SERIE_CREATE_REQUEST:
        return { loading: true };
      case SERIE_CREATE_SUCCESS:
        return { loading: false, success: true, serie: action.payload };
      case SERIE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SERIE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  // EDIT PRODUCT
  export const serieEditReducer = (
    state = { serie: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case SERIE_EDIT_REQUEST:
        return { ...state, loading: true };
      case SERIE_EDIT_SUCCESS:
        return { loading: false, serie: action.payload };
      case SERIE_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE PRODUCT
  export const serieUpdateReducer = (state = { serie: {} }, action) => {
    switch (action.type) {
      case SERIE_UPDATE_REQUEST:
        return { loading: true };
      case SERIE_UPDATE_SUCCESS:
        return { loading: false, success: true, serie: action.payload };
      case SERIE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case SERIE_UPDATE_RESET:
        return { serie: {} };
      default:
        return state;
    }
  };
  
















    
  
//   // Image Upload
//   export const filmImageReducer = (state = {}, action) => {
//     switch (action.type) {
//       case FILM_IMAGE_REQUEST:
//         return { imageLoading: true};
//       case FILM_IMAGE_SUCCESS:
//         return { imageLoading: false, mainPicture: action.payload };
//       case FILM_IMAGE_FAIL:
//         return { imageLoading: false, error: action.payload };
//       default:
//         return state;
//     }
//   };
  
//   // Background Upload
//   export const filmBackImageReducer = (state = {}, action) => {
//     switch (action.type) {
//       case FILM_BACKIMAGE_REQUEST:
//         return { backgroundLoading: true};
//       case FILM_BACKIMAGE_SUCCESS:
//         return { backgroundLoading: false, backgroundImage: action.payload };
//       case FILM_BACKIMAGE_FAIL:
//         return { backgroundLoading: false, error: action.payload };
//       default:
//         return state;
//     }
//   };
  
  