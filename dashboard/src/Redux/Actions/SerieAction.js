import {
  SERIE_CREATE_FAIL,
  SERIE_CREATE_REQUEST,
  SERIE_CREATE_SUCCESS,
  SERIE_DELETE_FAIL,
  SERIE_DELETE_REQUEST,
  SERIE_DELETE_SUCCESS,
  SERIE_EDIT_FAIL,
  SERIE_EDIT_REQUEST,
  SERIE_EDIT_SUCCESS,
  SERIE_LIST_FAIL,
  SERIE_LIST_REQUEST,
  SERIE_LIST_SUCCESS,
  SERIE_UPDATE_FAIL,
  SERIE_UPDATE_REQUEST,
  SERIE_UPDATE_SUCCESS,
} from "../Constants/SeriesConstants";
import axios from "axios";
import { logout } from "./userActions";
// import {
//   FILM_IMAGE_FAIL,
//   FILM_IMAGE_REQUEST,
//   FILM_IMAGE_SUCCESS,
//   FILM_BACKIMAGE_FAIL,
//   FILM_BACKIMAGE_REQUEST,
//   FILM_BACKIMAGE_SUCCESS,
// } from "../Constants/ProductImageConstants";
import { BASE_URL } from "../../api/baseConfig";

export const listSerie = (lang) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERIE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/filter/contents/${lang}/Iv6aACBWDps7s7NoOeP3`, config);

    dispatch({ type: SERIE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERIE_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteSerie = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERIE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "x-access-token": `${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/film/delete/${id}`, config);

    dispatch({ type: SERIE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERIE_DELETE_FAIL,
      payload: message,
    });
  }
};


// CREATE PRODUCT
export const createSerie =
  (
    product,files
  ) =>
  async (dispatch, getState) => {
    try {
      console.log(product)
      var today = new Date();
      var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
      dispatch({ type: SERIE_CREATE_REQUEST });
      product.content_date=date;
        const { 
          userLogin: { userInfo },
             } = getState();
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": `${userInfo.token}`,
          },
        };
        let formData = new FormData();
        formData.append("image", files.mainImg);
        formData.append("backgroundImg", files.mainBack);
        formData.append("products",JSON.stringify(product))

      const { data } = await axios.post(
        `${BASE_URL}/api/tvshow/add`,
        
          formData,
        config
      );

      dispatch({ type: SERIE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error)
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SERIE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PRODUCT
export const editSerie = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERIE_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/film/AZ/getbyidlang/${id}`);
    dispatch({ type: SERIE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERIE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateSerie = (product,files) => async (dispatch, getState) => {

  var today = new Date();
  var date =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getDate();
  product.content_date=date;

  try {
    const {
      userLogin: { userInfo },
         } = getState();
    dispatch({ type: SERIE_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": `${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", files.mainImg);
    formData.append("backgroundImg", files.mainBack);
    formData.append("products",JSON.stringify(product))
    const { data } = await axios.put(
      `${BASE_URL}/api/film/update/${product.id}`,
      formData,
      config
    );

    dispatch({ type: SERIE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: SERIE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERIE_UPDATE_FAIL,
      payload: message,
    });
  }
};













// UPDATE PRODUCT
// export const uploadImage = (file) => async (dispatch, getState) => {
//   console.log(file)
//   try {
//     dispatch({ type: FILM_IMAGE_REQUEST });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     let formData = new FormData();
//     formData.append("image", file);
//     const { data } = await axios.post(
//       `${BASE_URL}/api/film/uploadImage`,
//       formData,
//       config
//     );

//     dispatch({ type: FILM_IMAGE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: FILM_IMAGE_FAIL,
//       payload: message,
//     });
//   }
// };

// export const uploadBackImage = (file) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: FILM_BACKIMAGE_REQUEST });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     let formData = new FormData();
//     formData.append("image", file);
//     const { data } = await axios.post(
//       `${BASE_URL}/api/film/uploadImage`,
//       formData,
//       config
//     );
//     dispatch({ type: FILM_BACKIMAGE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: FILM_BACKIMAGE_FAIL,
//       payload: message,
//     });
//   }
// };