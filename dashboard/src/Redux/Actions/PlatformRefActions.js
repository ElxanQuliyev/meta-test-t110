import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import {
  PLATFORM_REF_CREATE_FAIL,
  PLATFORM_REF_CREATE_REQUEST,
  PLATFORM_REF_CREATE_SUCCESS,
  PLATFORM_REF_EDIT_FAIL,
  PLATFORM_REF_EDIT_REQUEST,
  PLATFORM_REF_EDIT_SUCCESS,
  PLATFORM_REF_LIST_FAIL,
  PLATFORM_REF_LIST_SUCCESS,
  PLATFORM_REF_UPDATE_FAIL,
  PLATFORM_REF_UPDATE_REQUEST,
  PLATFORM_REF_UPDATE_SUCCESS,
} from "../Constants/PlatformRefConstants";
import { logout } from "./userActions";

export const listPlatformRefs = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/platformref/AZ/getall`
    );
    dispatch({ type: PLATFORM_REF_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLATFORM_REF_LIST_FAIL,
      payload: message,
    });
  }
};

export const platformRefCreate =
  ({ catalog, content_type, platform }) =>
  async (dispatch, getState) => {
    dispatch({ type: PLATFORM_REF_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/platformref/add`,
        { catalog, content_type, platform },
        config
      );
      dispatch({ type: PLATFORM_REF_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PLATFORM_REF_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PLATFORM_REF_y
export const editPlatformRef = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLATFORM_REF_EDIT_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}/api/platformref/getbyid/${id}`
    );
    dispatch({ type: PLATFORM_REF_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PLATFORM_REF_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updatePlatformRefs =
  (id, { name }) =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({ type: PLATFORM_REF_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/platformref/update/${id}`,
        { id, name },
        config
      );

      dispatch({ type: PLATFORM_REF_UPDATE_SUCCESS, payload: data });
      dispatch({ type: PLATFORM_REF_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PLATFORM_REF_UPDATE_FAIL,
        payload: message,
      });
    }
  };
