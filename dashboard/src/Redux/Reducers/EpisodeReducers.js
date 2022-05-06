import {
    EPISODE_LIST_FAIL,
    EPISODE_LIST_SUCCESS,
    EPISODE_CREATE_REQUEST,
    EPISODE_CREATE_SUCCESS,
    EPISODE_CREATE_FAIL,
    EPISODE_EDIT_REQUEST,
    EPISODE_EDIT_SUCCESS,
    EPISODE_EDIT_FAIL,
    EPISODE_UPDATE_REQUEST,
    EPISODE_UPDATE_SUCCESS,
    EPISODE_UPDATE_FAIL,
    EPISODE_CREATE_RESET,
    EPISODE_UPDATE_RESET,
    EPISODE_DELETE_REQUEST,
    EPISODE_DELETE_SUCCESS,
    EPISODE_DELETE_FAIL,
    EPISODE_LIST_REQUEST
  } from "../Constants/EpisodeConstants";
    export const episodeListReducer = (state = {episodes:[]}, action) => {
      switch (action.type) {
        case EPISODE_LIST_REQUEST:
          return {loading:true };
        case EPISODE_LIST_SUCCESS:
          return {loading:false, episodes: action.payload };
        case EPISODE_LIST_FAIL:
          return { error: action.payload };
        default:
          return state;
      }
    };
    
    // Create EPISODE
  export const episodeCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EPISODE_CREATE_REQUEST:
        return { loading: true };
      case EPISODE_CREATE_SUCCESS:
        return { loading: false, success: true, episode: action.payload };
      case EPISODE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EPISODE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  // EDIT EPISODES
  export const episodeEditReducer = (
    state = { episode: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case EPISODE_EDIT_REQUEST:
        return { ...state, loading: true };
      case EPISODE_EDIT_SUCCESS:
        return { loading: false, episode: action.payload };
      case EPISODE_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE EPISODES
  export const episodeUpdateReducer = (state = { episode: {} }, action) => {
    switch (action.type) {
      case EPISODE_UPDATE_REQUEST:
        return { loading: true };
      case EPISODE_UPDATE_SUCCESS:
        return { loading: false, success: true, episode: action.payload };
      case EPISODE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EPISODE_UPDATE_RESET:
        return { episode: {} };
      default:
        return state;
    }
  };
  
  // DELETE PRODUCT
  export const episodeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EPISODE_DELETE_REQUEST:
        return { loading: true };
      case EPISODE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EPISODE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };