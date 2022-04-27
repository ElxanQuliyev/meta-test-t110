import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import { PLATFORM_CREATE_FAIL, PLATFORM_CREATE_REQUEST, PLATFORM_CREATE_SUCCESS, PLATFORM_EDIT_FAIL, PLATFORM_EDIT_REQUEST, PLATFORM_EDIT_SUCCESS, PLATFORM_LIST_FAIL,PLATFORM_LIST_SUCCESS, PLATFORM_UPDATE_FAIL, PLATFORM_UPDATE_REQUEST, PLATFORM_UPDATE_SUCCESS } from "../Constants/PlatformConstants";
import { logout } from "./userActions";

export const listPlatforms = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/platform/getall/`);
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

  

  export const platformCreate =
  ({ name }) =>
  async (dispatch, getState) => {
    dispatch({ type: PLATFORM_CREATE_REQUEST });
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
        `${BASE_URL}/api/platform/add`,
        {name} ,
        config
      );
      dispatch({ type: PLATFORM_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PLATFORM_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PLATFORM_y
export const editPlatform = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLATFORM_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/platform/getbyid/${id}`);
    dispatch({ type: PLATFORM_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PLATFORM_EDIT_FAIL,
      payload: message,
    });
  }
};


// UPDATE PRODUCT
export const updatePlatforms = (id,{name}) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: PLATFORM_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/platform/update/${id}`,
      {id,name},
      config
    );

    dispatch({ type: PLATFORM_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PLATFORM_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PLATFORM_UPDATE_FAIL,
      payload: message,
    });
  }
};
