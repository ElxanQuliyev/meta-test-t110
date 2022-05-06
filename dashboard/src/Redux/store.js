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
import { categoryCreateReducer, categoryEditReducer, categoryListReducer, categoryUpdateReducer } from "./Reducers/CategoryReducers";
import { languageListReducer } from "./Reducers/LanguageReducers";
import { catalogCreateReducer, catalogEditReducer, catalogListReducer, catalogUpdateReducer } from "./Reducers/CatalogReducers";
import { platformCreateReducer, platformEditReducer, platformListReducer, platformUpdateReducer } from "./Reducers/PlatformReducers";
import { seasonCreateReducer, seasonDeleteReducer, seasonEditReducer, seasonListReducer, seasonUpdateReducer } from "./Reducers/SeasonReducers";
import { actorCreateReducer, actorEditReducer, actorListReducer, actorUpdateReducer } from "./Reducers/ActorReducers";
import { directorCreateReducer, directorEditReducer, directorListReducer, directorUpdateReducer } from "./Reducers/DirectorReducers";
import { platformRefCreateReducer, platformRefEditReducer, platformRefListReducer, platformRefUpdateReducer } from "./Reducers/PlatformRefReducers";
import { serieCreateReducer, serieDeleteReducer, serieEditReducer, serieListReducer, serieUpdateReducer } from "./Reducers/SerieReducers";
import { episodeCreateReducer, episodeDeleteReducer, episodeEditReducer, episodeListReducer, episodeUpdateReducer } from "./Reducers/EpisodeReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  serieList: serieListReducer,
  serieDelete: serieDeleteReducer,
  serieCreate: serieCreateReducer,
  serieEdit: serieEditReducer,
  serieUpdate: serieUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  contentType:contentTypeReducer,
  languageList:languageListReducer,
  filmBackground:filmBackImageReducer,
  filmMainImage:filmImageReducer,
  platformList:platformListReducer,
  platformCreate:platformCreateReducer,
  platformUpdate:platformUpdateReducer,
  platformEdit:platformEditReducer,
  platformRefList:platformRefListReducer,
  platformRefCreate:platformRefCreateReducer,
  platformRefUpdate:platformRefUpdateReducer,
  platformRefEdit:platformRefEditReducer,
  actorList:actorListReducer,
  actorCreate:actorCreateReducer,
  actorUpdate:actorUpdateReducer,
  actorEdit:actorEditReducer,
  directorList:directorListReducer,
  directorCreate:directorCreateReducer,
  directorUpdate:directorUpdateReducer,
  directorEdit:directorEditReducer,
  seasonList:seasonListReducer,
  seasonCreate:seasonCreateReducer,
  seasonUpdate:seasonUpdateReducer,
  seasonEdit:seasonEditReducer,
  seasonDelete:seasonDeleteReducer,
  episodeList:episodeListReducer,
  episodeCreate:episodeCreateReducer,
  episodeUpdate:episodeUpdateReducer,
  episodeEdit:episodeEditReducer,
  episodeDelete:episodeDeleteReducer,
  categoryList:categoryListReducer,
  categoryCreate:categoryCreateReducer,
  categoryUpdate:categoryUpdateReducer,
  categoryEdit:categoryEditReducer,
  catalogList:catalogListReducer,
  catalogCreate:catalogCreateReducer,
  catalogUpdate:catalogUpdateReducer,
  catalogEdit:catalogEditReducer
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
