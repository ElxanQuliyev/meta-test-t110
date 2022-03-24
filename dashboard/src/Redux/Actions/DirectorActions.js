import axios from "axios";
import { DIRECTOR_LIST_SUCCESS,DIRECTOR_LIST_FAIL } from "../Constants/DirectorConstants";

export const listDirectors = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/directors/getall`);
      dispatch({ type: DIRECTOR_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DIRECTOR_LIST_FAIL,
        payload: message,
      });
    }
  };