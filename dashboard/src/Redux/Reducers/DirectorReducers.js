import {
    DIRECTOR_LIST_FAIL,
    DIRECTOR_LIST_SUCCESS,
  } from "../Constants/DirectorConstants";
  
  export const directorListReducer = (state = {}, action) => {
    switch (action.type) {
      case DIRECTOR_LIST_SUCCESS:
        return { directors: action.payload };
      case DIRECTOR_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  