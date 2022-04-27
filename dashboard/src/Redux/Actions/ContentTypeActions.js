import { CONTENT_TYPE_LIST_FAIL, CONTENT_TYPE_LIST_SUCCESS } from "../Constants/ContentTypeConstants";
import axios from "axios";
import { BASE_URL } from "../../api/baseConfig";
//Single Product
export const contentTypeList = (langKey)=> async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/contenttype/getall/${langKey}`);
        dispatch({type:CONTENT_TYPE_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:CONTENT_TYPE_LIST_FAIL, payload :
             error.response && error.response.data.message ?
             error.response.data.message
             :error.message});
    }
}
