import React from "react";
import "styles/homeSidebar.scss";
import { Link } from "react-router-dom";
import { FcBookmark, FcDocument, FcFile } from "react-icons/fc";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { RiDraftLine } from "react-icons/ri";
import { HiOutlineDocument } from "react-icons/hi";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BsPeople, BsPersonCheck } from "react-icons/bs";
import clsx from "clsx";
import { useSelector } from "react-redux";
export default function HomeSidebar() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "home-sidebar",
        dark ? "home-sidebar-dark" : "home-sidebar-light"
      )}
    >
      <ul className="side-nav ps-2">
        <li className="side-nav-item">
          <Link to="/profile" className="nav-link p-0 profile-link">
            <img
              src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
              alt=""
            />
            <span>Abhishek Ram</span>
          </Link>
        </li>
        <li className="side-nav-item">
          <span>
            <IoNewspaperOutline />{" "}
          </span>
          Posts
        </li>
        <li className="side-nav-item">
          <span>
            {" "}
            <HiOutlineDocument />
          </span>
          Drafts
        </li>
        <li className="side-nav-item">
          <span>
            <MdOutlineBookmarkBorder />
          </span>
          Saved
        </li>
        <li className="side-nav-item">
          <span>
            <BsPeople />
          </span>
          Followers
        </li>
        <li className="side-nav-item">
          <span>
            <BsPersonCheck />
          </span>
          Following
        </li>
        <hr />

        <li className="side-nav-item">
          <span>
            <IoSettingsOutline />
          </span>
          Settings
        </li>
      </ul>
    </div>
  );
}
