import React, { useEffect, useState } from "react";
import "styles/homeSidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineDocument } from "react-icons/hi";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BsPeople, BsPersonCheck } from "react-icons/bs";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
export default function HomeSidebar() {
  const location = useLocation();
  const { dark } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState("");

  console.log(user);
  const p =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    switch (p) {
      case "":
        setActive("home");
        break;
      case "profile":
        setActive("profile");
        break;
      case "posts":
        setActive("posts");
        break;
      case "saved":
        setActive("saved");
        break;
      case "followers":
        setActive("followers");
        break;
      case "following":
        setActive("following");
        break;
      case "drafts":
        setActive("drafts");
        break;
      case "settings":
        setActive("settings");
        break;

      default:
        break;
    }
  });

  return (
    <div
      className={clsx(
        "home-sidebar",
        dark ? "home-sidebar-dark" : "home-sidebar-light"
      )}
    >
      <ul className="side-nav ps-2">
        <li className={clsx("side-nav-item", active === "profile" && "active")}>
          <Link to="/profile" className="nav-link p-0 profile-link">
            <img
              src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
              alt=""
            />
            {user?.name && (
              <span>
                {user.name.split(" ")[0]}{" "}
                {user.name.split(" ")[user.name.split(" ").length - 1]}
              </span>
            )}
          </Link>
        </li>
        <li className={clsx("side-nav-item", active === "" && "active")}>
          <Link to="/">
            <span>
              <AiOutlineHome />{" "}
            </span>
            Home
          </Link>
        </li>
        <li className={clsx("side-nav-item", active === "posts" && "active")}>
          <Link to="/profile/posts">
            <span>
              <IoNewspaperOutline />{" "}
            </span>
            Posts
          </Link>
        </li>
        <li className={clsx("side-nav-item", active === "drafts" && "active")}>
          <Link to="/profile/drafts">
            <span>
              {" "}
              <HiOutlineDocument />
            </span>
            Drafts
          </Link>
        </li>
        <li className={clsx("side-nav-item", active === "saved" && "active")}>
          <Link to="/profile/saved">
            <span>
              <MdOutlineBookmarkBorder />
            </span>
            Saved
          </Link>
        </li>
        <li
          className={clsx("side-nav-item", active === "followers" && "active")}
        >
          <Link to="/profile/followers">
            <span>
              <BsPeople />
            </span>
            Followers
          </Link>
        </li>
        <li
          className={clsx("side-nav-item", active === "following" && "active")}
        >
          <Link to="/profile/following">
            <span>
              <BsPersonCheck />
            </span>
            Following
          </Link>
        </li>
        <hr />

        <li
          className={clsx("side-nav-item", active === "settings" && "active")}
        >
          <Link to="/profile/settings">
            <span>
              <IoSettingsOutline />
            </span>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
