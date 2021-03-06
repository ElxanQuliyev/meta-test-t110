import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";
import axios from "axios";
import { logout } from "./userActions";
import {
  FILM_IMAGE_FAIL,
  FILM_IMAGE_REQUEST,
  FILM_IMAGE_SUCCESS,
  FILM_BACKIMAGE_FAIL,
  FILM_BACKIMAGE_REQUEST,
  FILM_BACKIMAGE_SUCCESS,
} from "../Constants/ProductImageConstants";
import { BASE_URL } from "../../api/baseConfig";

export const listProducts =
  ({ lang, platformId,catalogId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "x-access-token": `${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/filter/contentsoptional/${lang}?platform=${platformId}&type=4f5n1cMxJ2zDC8b0vepv&catalog=${catalogId}`,
        config
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/film/delete/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const uploadImage = (file) => async (dispatch, getState) => {
  console.log(file);
  try {
    dispatch({ type: FILM_IMAGE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `${BASE_URL}/api/film/uploadImage`,
      formData,
      config
    );

    dispatch({ type: FILM_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: FILM_IMAGE_FAIL,
      payload: message,
    });
  }
};

export const uploadBackImage = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILM_BACKIMAGE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `${BASE_URL}/api/film/uploadImage`,
      formData,
      config
    );
    dispatch({ type: FILM_BACKIMAGE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: FILM_BACKIMAGE_FAIL,
      payload: message,
    });
  }
};
// CREATE PRODUCT
export const createProduct = (product, files) => async (dispatch, getState) => {
  try {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    product.content_date = date;
    const {
      userLogin: { userInfo },
    } = getState();
    //  console.log(userInfo.token)
    const config = {
      headers: {
        "Content-Type": "application/form-data",
        "x-access-token": `${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", files.mainImg);
    formData.append("backgroundImg", files.mainBack);
    formData.append("products", JSON.stringify(product));

    const { data } = await axios.post(
      `${BASE_URL}/api/film/Add`,

      formData,
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

// EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}/api/film/AZ/getbyidlang/${id}`
    );
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = (product, files) => async (dispatch, getState) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  product.content_date = date;
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo)
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "x-access-token": `${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", files.mainImg);
    formData.append("backgroundImg", files.mainBack);
    formData.append("products", JSON.stringify(product));
    
    const { data } = await axios.put(
      `${BASE_URL}/api/film/update/${product.id}`,
      formData,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};
