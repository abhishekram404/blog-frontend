import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Post from "components/Post";
import clsx from "clsx";
import "styles/app.scss";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "components/CreatePost";
import Homepage from "components/Homepage";
import Register from "components/Register";
import Login from "components/Login";
function App() {
  const { dark } = useSelector((state) => state.common);
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
