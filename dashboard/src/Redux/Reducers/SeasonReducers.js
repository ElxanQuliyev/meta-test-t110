import {
  SEASON_LIST_FAIL,
  SEASON_LIST_SUCCESS,
  SEASON_CREATE_REQUEST,
  SEASON_CREATE_SUCCESS,
  SEASON_CREATE_FAIL,
  SEASON_EDIT_REQUEST,
  SEASON_EDIT_SUCCESS,
  SEASON_EDIT_FAIL,
  SEASON_UPDATE_REQUEST,
  SEASON_UPDATE_SUCCESS,
  SEASON_UPDATE_FAIL,
  SEASON_CREATE_RESET,
  SEASON_UPDATE_RESET,
  SEASON_DELETE_REQUEST,
  SEASON_DELETE_SUCCESS,
  SEASON_DELETE_FAIL,
  SEASON_LIST_REQUEST
} from "../Constants/SeasonConstants";
  export const seasonListReducer = (state = {seasons:[]}, action) => {
    switch (action.type) {
      case SEASON_LIST_REQUEST:
        return {loading:true };
      case SEASON_LIST_SUCCESS:
        return {loading:false, seasons: action.payload };
      case SEASON_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  
  // Create Season
export const seasonCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SEASON_CREATE_REQUEST:
      return { loading: true };
    case SEASON_CREATE_SUCCESS:
      return { loading: false, success: true, season: action.payload };
    case SEASON_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SEASON_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// EDIT SEASON
export const seasonEditReducer = (
  state = { season: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SEASON_EDIT_REQUEST:
      return { ...state, loading: true };
    case SEASON_EDIT_SUCCESS:
      return { loading: false, season: action.payload };
    case SEASON_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE SEASON
export const seasonUpdateReducer = (state = { season: {} }, action) => {
  switch (action.type) {
    case SEASON_UPDATE_REQUEST:
      return { loading: true };
    case SEASON_UPDATE_SUCCESS:
      return { loading: false, success: true, season: action.payload };
    case SEASON_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SEASON_UPDATE_RESET:
      return { season: {} };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const seasonDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SEASON_DELETE_REQUEST:
      return { loading: true };
    case SEASON_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SEASON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};