import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import "styles/navbar.scss";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggle_dark_mode } from "redux/actions/commonActions";
export default function Navbar() {
  const dispatch = useDispatch();

  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "navbar px-1 px-md-4 py-2",
        dark ? "navbar_dark" : "navbar_light"
      )}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          Blog
        </Link>
        <ul className="navbar-nav flex-row">
          <li className="nav-item me-3">
            <Link
              to="/create-post"
              className="cta nav-link btn btn-primary px-2"
            >
              Create post
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link to="/login" className="nav-link btn btn-link px-2">
              Login
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link to="/register" className="cta nav-link btn btn-primary  px-2">
              Register
            </Link>
          </li>
          <li
            className="nav-item  dark-mode-switch"
            // role="button"
            onClick={() => dispatch(toggle_dark_mode())}
          >
            {dark ? (
              <MdLightMode className="icon" />
            ) : (
              <MdDarkMode className="icon" />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
