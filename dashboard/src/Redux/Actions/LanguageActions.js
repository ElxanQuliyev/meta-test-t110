import axios from "axios";
import { CATEGORY_LIST_FAIL } from "../Constants/CategoryConstants";
import { LANGUAGE_LIST_SUCCESS } from "../Constants/LanguageConstants";

export const listLanguage = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/language/getall`);
      dispatch({ type: LANGUAGE_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: message,
      });
    }
  };