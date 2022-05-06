import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import ActorsScreen from "./screens/ActorsScreen";
import DirectorsScreen from "./screens/DirectorsScreen";
import PlatformsScreen from "./screens/PlatformsScreen";
import PlatformsRefScreen from "./screens/PlatformsRefScreen";
import CatalogsScreens from "./screens/CatalogsScreens";
import SerieEditScreen from "./screens/SerieEditScreen";
import AddSeries from "./screens/AddSeries";
import SeriesScreen from "./screens/SeriesScreen";
import SeosonEpisodeScreen from "./screens/SeosonEpisodeScreen";
import AddSeasonScreen from "./screens/AddSeasonScreen";
import SeasonEditScreen from "./screens/SeasonEditScreen";
import AddEpisodeScreen from "./screens/AddEpisodeScreen";
import EpisodeListScreen from "./screens/EpisodeListScreen";
import EpisodeEditScreen from "./screens/EpisodeEditScreen";


function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts("AZ"));
      // dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/series" component={SeriesScreen} />
          {["/category", "/category/:id/edit"].map((path, index) => (
            <PrivateRouter
              exact
              path={path}
              component={CategoriesScreen}
              key={index}
            />
          ))}

          {["/catalog", "/catalog/:id/edit"].map((path, index) => (
            <PrivateRouter
              exact
              path={path}
              component={CatalogsScreens}
              key={index}
            />
          ))}

          {["/actor", "/actor/:id/edit"].map((path, index) => (
            <PrivateRouter
              exact
              path={path}
              component={ActorsScreen}
              key={index}
            />
          ))}
          {["/director", "/director/:id/edit"].map((path, index) => (
            <PrivateRouter
              exact
              path={path}
              component={DirectorsScreen}
              key={index}
            />
          ))}

          {["/platform", "/platform/:id/edit"].map((path, index) => (
            <PrivateRouter
              exact
              path={path}
              component={PlatformsScreen}
              key={index}
            />
          ))}
          {["/platform-ref", "/platform-ref/:id/edit"].map((path, index) => (
            <PrivateRouter
              exact
              path={path}
              component={PlatformsRefScreen}
              key={index}
            />
          ))}
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addMovie" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter
            exact
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <PrivateRouter path="/season-episode/:id/getall" component={SeosonEpisodeScreen} />
          <PrivateRouter path="/addSeries" component={AddSeries} />
          <PrivateRouter path="/addEpisode/:id/" component={AddEpisodeScreen} />
          <PrivateRouter path="/episodes/:id/" component={EpisodeListScreen} />
          <PrivateRouter path="/episode/:id/edit" component={EpisodeEditScreen} />

          <PrivateRouter path="/add-season/:id" component={AddSeasonScreen} />
          <PrivateRouter path="/season/:id/:tvshowId/edit" component={SeasonEditScreen} />

          <PrivateRouter path="/serie/:id/edit" component={SerieEditScreen} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
