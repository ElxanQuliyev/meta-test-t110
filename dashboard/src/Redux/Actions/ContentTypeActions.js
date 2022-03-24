import { CONTENTTYPE_LIST_FAIL, CONTENTTYPE_LIST_SUCCESS } from "../Constants/ContentTypeConstants";
import axios from "axios";
//Single Product
export const contentTypeList = (langKey)=> async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/contenttype/getall/${langKey}`);
        dispatch({type:CONTENTTYPE_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:CONTENTTYPE_LIST_FAIL, payload :
             error.response && error.response.data.message ?
             error.response.data.message
             :error.message});
    }
}
