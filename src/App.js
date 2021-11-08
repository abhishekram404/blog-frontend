import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Post from "components/Post";
import ProtectedRoute from "components/ProtectedRoute";
import clsx from "clsx";
import "styles/app.scss";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "components/CreatePost";
import Homepage from "components/Homepage";
import Register from "components/Register";
import Login from "components/Login";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import {
  INFO,
  CLEAR_ALERT,
  ERROR,
  SUCCESS,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
} from "redux/constants";
import Cookies from "js-cookie";
function App() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { dark, isUserLoggedIn } = useSelector((state) => state.common);
  const { type, message } = useSelector((state) => state.alert);
  const alertOnClose = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  const [authenticated, setAuthenticated] = useState(() =>
    Boolean(Number(Cookies.get("isUserLoggedIn")))
  );
  useEffect(() => {
    if (!authenticated) {
      return dispatch({
        // type: NOT_AUTHENTICATED,
        type: AUTHENTICATED,
      });
    } else {
      return dispatch({
        type: AUTHENTICATED,
      });
    }
  }, [authenticated]);

  useEffect(() => {
    switch (type) {
      case SUCCESS:
        alert.success(message, {
          onClose: alertOnClose,
        });
        break;
      case ERROR:
        alert.error(message, {
          onClose: alertOnClose,
        });
        break;
      case INFO:
        alert.info(message, {
          onClose: alertOnClose,
        });
        break;
      default:
        break;
    }
  }, [type, message]);

  return (
    <Router>
      <div className={clsx("app", dark ? "app_dark" : "app_light")}>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/post" component={Post} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/create-post" component={CreatePost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
