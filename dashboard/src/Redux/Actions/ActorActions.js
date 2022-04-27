import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import {
  ACTOR_LIST_FAIL,
  ACTOR_LIST_SUCCESS,
  ACTOR_CREATE_REQUEST,
  ACTOR_CREATE_SUCCESS,
  ACTOR_CREATE_FAIL,
  ACTOR_EDIT_REQUEST,
  ACTOR_EDIT_SUCCESS,
  ACTOR_EDIT_FAIL,
  ACTOR_UPDATE_REQUEST,
  ACTOR_UPDATE_SUCCESS,
  ACTOR_UPDATE_FAIL,
} from "../Constants/ActorConstants";
import { logout } from "./userActions";

export const listActors = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/actors/getall`);
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

export const actorCreate =
  ({ name, mainPicture }) =>
  async (dispatch, getState) => {
    dispatch({ type: ACTOR_CREATE_REQUEST });
    console.log(mainPicture)
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
        `${BASE_URL}/api/actors/add`,
        formData ,
        config
      );
      dispatch({ type: ACTOR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ACTOR_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT ACTOR_y
export const editActors = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTOR_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/actors/getbyid/${id}`);
    dispatch({ type: ACTOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ACTOR_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateActors = (id,{name, mainPicture }) => async (dispatch, getState) => {
  try {
    console.log(mainPicture)
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: ACTOR_UPDATE_REQUEST });
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
      `${BASE_URL}/api/actors/update/${id}`,
      formData,
      config
    );

    dispatch({ type: ACTOR_UPDATE_SUCCESS, payload: data });
    dispatch({ type: ACTOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ACTOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
