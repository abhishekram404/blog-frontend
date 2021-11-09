import React from "react";
import "styles/homeSidebar.scss";
import { Link } from "react-router-dom";
export default function HomeSidebar() {
  return (
    <div className="home-sidebar">
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
          <span></span>My posts
        </li>
        <li className="side-nav-item">
          <span></span>Drafts
        </li>
        <li className="side-nav-item">
          <span></span>Saved
        </li>
        <li className="side-nav-item">
          <span></span>Followers
        </li>
        <li className="side-nav-item">
          <span></span>Following
        </li>
      </ul>
    </div>
  );
}
