import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import {
  EPISODE_LIST_FAIL,
  EPISODE_LIST_SUCCESS,
  EPISODE_CREATE_REQUEST,
  EPISODE_CREATE_SUCCESS,
  EPISODE_CREATE_FAIL,
  EPISODE_EDIT_REQUEST,
  EPISODE_EDIT_SUCCESS,
  EPISODE_EDIT_FAIL,
  EPISODE_UPDATE_REQUEST,
  EPISODE_UPDATE_SUCCESS,
  EPISODE_UPDATE_FAIL,
  EPISODE_DELETE_SUCCESS,
  EPISODE_DELETE_FAIL,
  EPISODE_DELETE_REQUEST,
} from "../Constants/EpisodeConstants";
import { logout } from "./userActions";

export const listEpisode = (seasonId,lang) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/series/getall/${seasonId}/${lang}`);
    dispatch({ type: EPISODE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EPISODE_LIST_FAIL,
      payload: message,
    });
  }
};

export const episodeCreate =
  (episodeInfo, files) =>
  async (dispatch, getState) => {
    dispatch({ type: EPISODE_CREATE_REQUEST });
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
      formData.append("episodes", JSON.stringify(episodeInfo));
      const { data } = await axios.post(
        `${BASE_URL}/api/series/add/${episodeInfo.season_id}`,
        formData ,
        config
      );
      dispatch({ type: EPISODE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: EPISODE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT EPISODE_y
export const editEpisode= (id) => async (dispatch) => {
  try {
    console.log(id)
    dispatch({ type: EPISODE_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/series/getbyid/${id}`);
    dispatch({ type: EPISODE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EPISODE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateEpisode = (episode,file) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: EPISODE_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", file.mainImg);
    formData.append("episodes", JSON.stringify(episode));
    

    const { data } = await axios.put(
      `${BASE_URL}/api/series/update/${episode.episode_id}`,
      formData,
      config
    );

    dispatch({ type: EPISODE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: EPISODE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EPISODE_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteEpisode = (id,tvhshowId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EPISODE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/series/delete/${id}/${tvhshowId}`, config);

    dispatch({ type: EPISODE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EPISODE_DELETE_FAIL,
      payload: message,
    });
  }
};