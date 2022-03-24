import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  filmBackImageReducer,
  filmImageReducer,
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";
import { contentTypeReducer } from "./Reducers/ContentTypeReducers";
import { categoryListReducer } from "./Reducers/CategoryReducers";
import { languageListReducer } from "./Reducers/LanguageReducers";
import { catalogListReducer } from "./Reducers/CatalogReducers";
import { platformListReducer } from "./Reducers/PlatformReducers";
import { actorListReducer } from "./Reducers/ActorReducers";
import { directorListReducer } from "./Reducers/DirectorReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  contentType:contentTypeReducer,
  categoryList:categoryListReducer,
  languageList:languageListReducer,
  filmBackground:filmBackImageReducer,
  filmMainImage:filmImageReducer,
  catalogList:catalogListReducer,
  platformList:platformListReducer,
  actorList:actorListReducer,
  directorList:directorListReducer
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
