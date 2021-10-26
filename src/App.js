import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Post from "components/Post";
import clsx from "clsx";
import "styles/app.scss";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div className={clsx("app", dark ? "app_dark" : "app_light")}>
      <Navbar />
      <Post />
    </div>
  );
}

export default App;
