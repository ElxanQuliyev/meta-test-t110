import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_EDIT_FAIL, CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS } from "../Constants/CategoryConstants";
import { logout } from "./userActions";

export const listCategories = (lang) => async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/category/getall/${lang}`);
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: message,
      });
    }
  };


  export const categoryCreate =(lang)=>async (dispatch,getState)=>{
    dispatch({ type: CATEGORY_CREATE_REQUEST });
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
      const {data}= await axios.post(`${BASE_URL}/api/category/add`,{language:lang},config)
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });   
    }
  }

  
// EDIT Category
export const editCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/category/getbyid/${id}`);
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateCategory = (id,language) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
         } = getState();
    dispatch({ type: CATEGORY_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/category/update/${id}`,
      {language:language},
      config
    );

    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};
