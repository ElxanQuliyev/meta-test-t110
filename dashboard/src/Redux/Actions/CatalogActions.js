import axios from "axios";
import { CATALOG_LIST_FAIL, CATALOG_LIST_SUCCESS } from "../Constants/CatalogConstants";

export const listCatalogs = (lang) => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/catalogs/getall/${lang}`);
      dispatch({ type: CATALOG_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATALOG_LIST_FAIL,
        payload: message,
      });
    }
  };