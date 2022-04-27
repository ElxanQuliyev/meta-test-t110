import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import {
  CATALOG_CREATE_FAIL,
  CATALOG_CREATE_REQUEST,
  CATALOG_CREATE_SUCCESS,
  CATALOG_EDIT_FAIL,
  CATALOG_EDIT_REQUEST,
  CATALOG_EDIT_SUCCESS,
  CATALOG_LIST_FAIL,
  CATALOG_LIST_SUCCESS,
  CATALOG_UPDATE_FAIL,
  CATALOG_UPDATE_REQUEST,
  CATALOG_UPDATE_SUCCESS,
} from "../Constants/CatalogConstants";
import { logout } from "./userActions";

export const listCatalogs = (lang) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/catalogs/getall/${lang}`);
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

export const catalogCreate = (lang) => async (dispatch, getState) => {
  dispatch({ type: CATALOG_CREATE_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/catalogs/add`,
      { language: lang },
      config
    );
    dispatch({ type: CATALOG_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATALOG_CREATE_FAIL,
      payload: message,
    });
  }
};

// EDIT Catalog
export const editCatalog = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATALOG_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/catalogs/getbyid/${id}`);
    dispatch({ type: CATALOG_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATALOG_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateCatalog = (id, language) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: CATALOG_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/catalogs/update/${id}`,
      { language: language },
      config
    );

    dispatch({ type: CATALOG_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CATALOG_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATALOG_UPDATE_FAIL,
      payload: message,
    });
  }
};
