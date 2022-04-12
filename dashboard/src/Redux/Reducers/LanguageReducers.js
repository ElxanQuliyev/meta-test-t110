import { LANGUAGE_LIST_FAIL, LANGUAGE_LIST_SUCCESS } from "../Constants/LanguageConstants";

export const languageListReducer = (state = {languages:[]}, action) => {
    switch (action.type) {
      case LANGUAGE_LIST_SUCCESS:
        return {  languages: action.payload };
      case LANGUAGE_LIST_FAIL:
        return {  error: action.payload };
      default:
        return state;
    }
  };