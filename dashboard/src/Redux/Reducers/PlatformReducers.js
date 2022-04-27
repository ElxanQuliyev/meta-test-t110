import {
    PLATFORM_LIST_SUCCESS,
    PLATFORM_LIST_FAIL,
    PLATFORM_EDIT_REQUEST,
    PLATFORM_EDIT_SUCCESS,
    PLATFORM_EDIT_FAIL,
    PLATFORM_UPDATE_REQUEST,
    PLATFORM_UPDATE_SUCCESS,
    PLATFORM_UPDATE_FAIL,
    PLATFORM_UPDATE_RESET,
    PLATFORM_CREATE_REQUEST,
    PLATFORM_CREATE_SUCCESS,
    PLATFORM_CREATE_FAIL,
    PLATFORM_CREATE_RESET,
  } from "../Constants/PlatformConstants";
  
  export const platformListReducer = (state = {platforms:[]}, action) => {
    switch (action.type) {
      case PLATFORM_LIST_SUCCESS:
        return { platforms: action.payload };
      case PLATFORM_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  
  export const platformCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PLATFORM_CREATE_REQUEST:
        return { loading: true };
      case PLATFORM_CREATE_SUCCESS:
        return { loading: false, success: true, platform: action.payload };
      case PLATFORM_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PLATFORM_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  // EDIT PRODUCT
  export const platformEditReducer = (
    state = { platform: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case PLATFORM_EDIT_REQUEST:
        return { ...state, loading: true };
      case PLATFORM_EDIT_SUCCESS:
        return { loading: false, platform: action.payload };
      case PLATFORM_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE PRODUCT
  export const platformUpdateReducer = (state = { platform: {} }, action) => {
    switch (action.type) {
      case PLATFORM_UPDATE_REQUEST:
        return { loading: true };
      case PLATFORM_UPDATE_SUCCESS:
        return { loading: false, success: true, platform: action.payload };
      case PLATFORM_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PLATFORM_UPDATE_RESET:
        return { platform: {} };
      default:
        return state;
    }
  };
  
  