import {
  ACTOR_LIST_FAIL,
  ACTOR_LIST_SUCCESS,
  ACTOR_CREATE_REQUEST,
  ACTOR_CREATE_SUCCESS,
  ACTOR_CREATE_FAIL,
  ACTOR_EDIT_REQUEST,
  ACTOR_EDIT_SUCCESS,
  ACTOR_EDIT_FAIL,
  ACTOR_UPDATE_REQUEST,
  ACTOR_UPDATE_SUCCESS,
  ACTOR_UPDATE_FAIL,
  ACTOR_CREATE_RESET,
  ACTOR_UPDATE_RESET
} from "../Constants/ActorConstants";
  export const actorListReducer = (state = {actors:[]}, action) => {
    switch (action.type) {
      case ACTOR_LIST_SUCCESS:
        return { actors: action.payload };
      case ACTOR_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  
  // Create Actor
export const actorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTOR_CREATE_REQUEST:
      return { loading: true };
    case ACTOR_CREATE_SUCCESS:
      return { loading: false, success: true, actors: action.payload };
    case ACTOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACTOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// EDIT PRODUCT
export const actorEditReducer = (
  state = { actor: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACTOR_EDIT_REQUEST:
      return { ...state, loading: true };
    case ACTOR_EDIT_SUCCESS:
      return { loading: false, actor: action.payload };
    case ACTOR_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const actorUpdateReducer = (state = { actor: {} }, action) => {
  switch (action.type) {
    case ACTOR_UPDATE_REQUEST:
      return { loading: true };
    case ACTOR_UPDATE_SUCCESS:
      return { loading: false, success: true, actor: action.payload };
    case ACTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACTOR_UPDATE_RESET:
      return { actor: {} };
    default:
      return state;
  }
};
