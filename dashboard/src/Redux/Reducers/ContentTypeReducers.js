import { CONTENTTYPE_LIST_FAIL, CONTENTTYPE_LIST_REQUEST, CONTENTTYPE_LIST_SUCCESS } from "../Constants/ContentTypeConstants";

export const contentTypeReducer = (state={}, action) =>{
    switch (action.type) {
            case CONTENTTYPE_LIST_SUCCESS:
                return { loading: false, contentType: action.payload };
                case CONTENTTYPE_LIST_FAIL:
                    return { loading: false, error: action.payload };
        default:
            return state;
    }
}