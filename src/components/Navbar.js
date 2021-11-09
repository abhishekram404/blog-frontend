import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "styles/navbar.scss";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggle_dark_mode } from "redux/actions/commonActions";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Navbar() {
  const dispatch = useDispatch();
  const { dark, isUserLoggedIn } = useSelector((state) => state.common);
  const [navExpanded, setNavExpanded] = useState(false);

  const resize = () => {
    if (window.innerWidth > 576) {
      return setNavExpanded(true);
    }
    setNavExpanded(false);
  };

  useEffect(() => {
    if (window.innerWidth > 576) {
      setNavExpanded(true);
    }
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", null);
    };
  }, []);
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
        <button
          className="menu-btn btn d-sm-none"
          onClick={() => setNavExpanded(!navExpanded)}
        >
          <HiOutlineMenuAlt4 className="menu-btn-icon" />
        </button>
        {navExpanded && (
          <ul
            className={clsx(
              "navbar-nav  flex-row align-items-center",
              navExpanded && "expanded"
            )}
          >
            {isUserLoggedIn ? (
              <>
                <li className="nav-item me-3">
                  <Link
                    to="/create-post"
                    className="cta nav-link btn btn-primary px-2"
                  >
                    Create post
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link to="/profile" className="nav-link p-2 profile-link">
                    <img
                      src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
                      alt=""
                    />
                    <span>Abhishek Ram</span>
                  </Link>
                </li>
                <li
                  className="nav-item me-3"
                  role="button"
                  onClick={() => dispatch(logout())}
                >
                  <button className="nav-link btn btn-link  px-2">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <Link to="/login" className="nav-link btn btn-link px-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link
                    to="/register"
                    className="cta nav-link btn btn-primary  px-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
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
        )}
      </div>
    </div>
  );
}
