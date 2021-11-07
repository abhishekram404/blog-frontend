import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Post from "components/Post";
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
import { INFO, CLEAR_ALERT, ERROR, SUCCESS } from "redux/constants";

function App() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.common);
  const { type, message } = useSelector((state) => state.alert);
  const alertOnClose = () => {
    dispatch({ type: CLEAR_ALERT });
  };
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
          <Route path="/create-post" component={CreatePost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
