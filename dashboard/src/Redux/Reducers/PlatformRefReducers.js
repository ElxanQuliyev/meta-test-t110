import {
    PLATFORM_REF_LIST_SUCCESS,
    PLATFORM_REF_LIST_FAIL,
    PLATFORM_REF_EDIT_REQUEST,
    PLATFORM_REF_EDIT_SUCCESS,
    PLATFORM_REF_EDIT_FAIL,
    PLATFORM_REF_UPDATE_REQUEST,
    PLATFORM_REF_UPDATE_SUCCESS,
    PLATFORM_REF_UPDATE_FAIL,
    PLATFORM_REF_UPDATE_RESET,
    PLATFORM_REF_CREATE_REQUEST,
    PLATFORM_REF_CREATE_SUCCESS,
    PLATFORM_REF_CREATE_FAIL,
    PLATFORM_REF_CREATE_RESET,
  } from "../Constants/PlatformRefConstants";
  
  export const platformRefListReducer = (state = {platformRefs:[]}, action) => {
    switch (action.type) {
      case PLATFORM_REF_LIST_SUCCESS:
        return { platformRefs: action.payload };
      case PLATFORM_REF_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  
  export const platformRefCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PLATFORM_REF_CREATE_REQUEST:
        return { loading: true };
      case PLATFORM_REF_CREATE_SUCCESS:
        return { loading: false, success: true, platformRef: action.payload };
      case PLATFORM_REF_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PLATFORM_REF_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  // EDIT PRODUCT
  export const platformRefEditReducer = (
    state = { platformRef: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case PLATFORM_REF_EDIT_REQUEST:
        return { ...state, loading: true };
      case PLATFORM_REF_EDIT_SUCCESS:
        return { loading: false, platformRef: action.payload };
      case PLATFORM_REF_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE PRODUCT
  export const platformRefUpdateReducer = (state = { platformRef: {} }, action) => {
    switch (action.type) {
      case PLATFORM_REF_UPDATE_REQUEST:
        return { loading: true };
      case PLATFORM_REF_UPDATE_SUCCESS:
        return { loading: false, success: true, platformRef: action.payload };
      case PLATFORM_REF_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PLATFORM_REF_UPDATE_RESET:
        return { platformRef: {} };
      default:
        return state;
    }
  };
  
  