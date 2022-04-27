import {  CONTENT_TYPE_LIST_FAIL, CONTENT_TYPE_LIST_SUCCESS } from "../Constants/ContentTypeConstants";

export const contentTypeReducer = (state={}, action) =>{
    switch (action.type) {
            case CONTENT_TYPE_LIST_SUCCESS:
                return { loading: false, contentType: action.payload };
                case CONTENT_TYPE_LIST_FAIL:
                    return { loading: false, error: action.payload };
        default:
            return state;
    }
}