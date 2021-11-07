import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router";
import { LOADING_OFF, LOADING_ON } from "redux/constants";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.common);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isUserLoggedIn ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}
