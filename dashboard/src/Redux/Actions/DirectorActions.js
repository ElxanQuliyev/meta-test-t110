import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";

import { 
  DIRECTOR_LIST_FAIL,
  DIRECTOR_LIST_SUCCESS,
  DIRECTOR_CREATE_REQUEST,
  DIRECTOR_CREATE_SUCCESS,
  DIRECTOR_CREATE_FAIL,
  DIRECTOR_EDIT_REQUEST,
  DIRECTOR_EDIT_SUCCESS,
  DIRECTOR_EDIT_FAIL,
  DIRECTOR_UPDATE_REQUEST,
  DIRECTOR_UPDATE_SUCCESS,
  DIRECTOR_UPDATE_FAIL,

} from "../Constants/DirectorConstants";
import { logout } from "./userActions";

export const listDirectors = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/directors/getall`);
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

  export const directorCreate =
  ({ name, mainPicture }) =>
  async (dispatch, getState) => {
    dispatch({ type: DIRECTOR_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };
    try {
      let formData = new FormData();

      formData.append("image", mainPicture);
      formData.append("name", name);

      const { data } = await axios.post(
        `${BASE_URL}/api/directors/add`,
        formData ,
        config
      );
      dispatch({ type: DIRECTOR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: DIRECTOR_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT DIRECTOR_y
export const editDirectors = (id) => async (dispatch) => {
  try {
    dispatch({ type: DIRECTOR_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/directors/getbyid/${id}`);
    dispatch({ type: DIRECTOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DIRECTOR_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateDirectors = (id,{name, mainPicture }) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: DIRECTOR_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.token}`,
      },
    };
    let formData=new FormData();
    formData.append("id", id);
    formData.append("image", mainPicture);
    formData.append("name", name);

    const { data } = await axios.put(
      `${BASE_URL}/api/Directors/update/${id}`,
      formData,
      config
    );

    dispatch({ type: DIRECTOR_UPDATE_SUCCESS, payload: data });
    dispatch({ type: DIRECTOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DIRECTOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
