import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userLogin)
  return (
    <Route
      {...rest}
      component={(props) => {
        if (userInfo && userInfo.is_admin) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/login`} />;
        }
      }}
    />
  );
}

export default PrivateRouter;
