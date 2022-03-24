import {
    PLATFORM_LIST_SUCCESS,
    PLATFORM_LIST_FAIL,
  } from "../Constants/PlatformConstants";
  
  export const platformListReducer = (state = {}, action) => {
    switch (action.type) {
      case PLATFORM_LIST_SUCCESS:
        return { platforms: action.payload };
      case PLATFORM_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  