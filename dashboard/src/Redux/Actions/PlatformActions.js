import axios from "axios";
import { PLATFORM_LIST_FAIL,PLATFORM_LIST_SUCCESS } from "../Constants/PlatformConstants";

export const listPlatforms = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/platform/getall/`);
      dispatch({ type: PLATFORM_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PLATFORM_LIST_FAIL,
        payload: message,
      });
    }
  };