import {
    ACTOR_LIST_FAIL,
    ACTOR_LIST_SUCCESS,
  } from "../Constants/ActorConstants";
  
  export const actorListReducer = (state = {}, action) => {
    switch (action.type) {
      case ACTOR_LIST_SUCCESS:
        return { actors: action.payload };
      case ACTOR_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
  