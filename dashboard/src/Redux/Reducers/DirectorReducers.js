import {
  DIRECTOR_CREATE_FAIL,
  DIRECTOR_CREATE_REQUEST,
    DIRECTOR_CREATE_RESET,
    DIRECTOR_CREATE_SUCCESS,
    DIRECTOR_EDIT_FAIL,
    DIRECTOR_EDIT_REQUEST,
    DIRECTOR_EDIT_SUCCESS,
    DIRECTOR_LIST_FAIL,
    DIRECTOR_LIST_SUCCESS,
    DIRECTOR_UPDATE_FAIL,
    DIRECTOR_UPDATE_REQUEST,
    DIRECTOR_UPDATE_RESET,
    DIRECTOR_UPDATE_SUCCESS,
  } from "../Constants/DirectorConstants";
  
  export const directorListReducer = (state = {directors:[]}, action) => {
    switch (action.type) {
      case DIRECTOR_LIST_SUCCESS:
        return { directors: action.payload };
      case DIRECTOR_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };

  export const directorCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case DIRECTOR_CREATE_REQUEST:
        return { loading: true };
      case DIRECTOR_CREATE_SUCCESS:
        return { loading: false, success: true, director: action.payload };
      case DIRECTOR_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case DIRECTOR_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  // EDIT PRODUCT
  export const directorEditReducer = (
    state = { director: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case DIRECTOR_EDIT_REQUEST:
        return { ...state, loading: true };
      case DIRECTOR_EDIT_SUCCESS:
        return { loading: false, director: action.payload };
      case DIRECTOR_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE PRODUCT
  export const directorUpdateReducer = (state = { director: {} }, action) => {
    switch (action.type) {
      case DIRECTOR_UPDATE_REQUEST:
        return { loading: true };
      case DIRECTOR_UPDATE_SUCCESS:
        return { loading: false, success: true, director: action.payload };
      case DIRECTOR_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case DIRECTOR_UPDATE_RESET:
        return { director: {} };
      default:
        return state;
    }
  };
  
  