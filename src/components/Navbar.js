import clsx from "clsx";
import React from "react";
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
        "navbar px-4 py-2",
        dark ? "navbar_dark" : "navbar_light"
      )}
    >
      <div className="container">
        <a href="#" className="navbar-brand">
          Blog
        </a>
        <div className="navbar-nav">
          <div
            className="nav-items dark-mode-switch"
            role="button"
            onClick={() => dispatch(toggle_dark_mode())}
          >
            {dark ? (
              <MdLightMode className="icon" />
            ) : (
              <MdDarkMode className="icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
