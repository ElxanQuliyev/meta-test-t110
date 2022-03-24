import axios from "axios";
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../Constants/CategoryConstants";

export const listCategories = (lang) => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/category/getall/${lang}`);
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
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