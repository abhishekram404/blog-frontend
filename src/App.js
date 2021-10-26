import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Post from "components/Post";
import clsx from "clsx";
import "styles/app.scss";
function App() {
  return (
    <div className={clsx("app", "app_light")}>
      <Navbar />
      <Post />
    </div>
  );
}

export default App;
