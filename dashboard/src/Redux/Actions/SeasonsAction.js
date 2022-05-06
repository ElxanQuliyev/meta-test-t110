import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import {
  SEASON_LIST_FAIL,
  SEASON_LIST_SUCCESS,
  SEASON_CREATE_REQUEST,
  SEASON_CREATE_SUCCESS,
  SEASON_CREATE_FAIL,
  SEASON_EDIT_REQUEST,
  SEASON_EDIT_SUCCESS,
  SEASON_EDIT_FAIL,
  SEASON_UPDATE_REQUEST,
  SEASON_UPDATE_SUCCESS,
  SEASON_UPDATE_FAIL,
  SEASON_DELETE_SUCCESS,
  SEASON_DELETE_FAIL,
  SEASON_DELETE_REQUEST,
} from "../Constants/SeasonConstants";
import { logout } from "./userActions";

export const listSeason = (tvshowId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/Season/getall/${tvshowId}`);
    dispatch({ type: SEASON_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SEASON_LIST_FAIL,
      payload: message,
    });
  }
};

export const seasonCreate =
  (seasonInfo, files) =>
  async (dispatch, getState) => {
    dispatch({ type: SEASON_CREATE_REQUEST });
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
      formData.append("image", files.mainImg);
      formData.append("seasons", JSON.stringify(seasonInfo));
      const { data } = await axios.post(
        `${BASE_URL}/api/Season/add/${seasonInfo.tvshowId}`,
        formData ,
        config
      );
      dispatch({ type: SEASON_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SEASON_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT SEASON_y
export const editSeason = (id) => async (dispatch) => {
  try {
    dispatch({ type: SEASON_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/Season/getbyid/${id}`);
    dispatch({ type: SEASON_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SEASON_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateSeason = (season,file) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: SEASON_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", file.mainImg);
    formData.append("seasons", JSON.stringify(season));
    

    const { data } = await axios.put(
      `${BASE_URL}/api/Season/update/${season.seasonId}`,
      formData,
      config
    );

    dispatch({ type: SEASON_UPDATE_SUCCESS, payload: data });
    dispatch({ type: SEASON_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SEASON_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteSeason = (id,tvhshowId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEASON_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/season/delete/${id}/${tvhshowId}`, config);

    dispatch({ type: SEASON_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SEASON_DELETE_FAIL,
      payload: message,
    });
  }
};