import axios from "axios";
import { ACTOR_LIST_FAIL, ACTOR_LIST_SUCCESS } from "../Constants/ActorConstants";

export const listActors = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/actors/getall`);
      dispatch({ type: ACTOR_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ACTOR_LIST_FAIL,
        payload: message,
      });
    }
  };