import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import "styles/profile.scss";
import { AiOutlineStar } from "react-icons/ai";
export default function Profile() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "profile py-4 px-1 p-md-4",
        dark ? "profile_dark" : "profile_light"
      )}
    >
      <div className="container row mx-auto">
        <div className="profile-section col-12 col-md-4  col-sm-5  p-3">
          <div className="avatar-section">
            <img
              src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
              alt=""
            />
          </div>
          <br />
          <div className="details-section">
            <h3>Abhishek Ram</h3>
            <div className="username">@abhishekram</div>
            <div className="bio">I am a programmer.</div>
            <div className="connections">
              <FiUsers className="icon" /> &nbsp;
              <b>7</b> followers &bull; <b>10</b> following
            </div>
            <div className="address">
              <IoLocationOutline className="icon" /> Lives in Kathmandu
            </div>
            <div className="joined">
              <AiOutlineStar className="icon" /> Joined 3 days ago
            </div>
            <button className="edit-profile-btn btn btn-sm btn-light px-4">
              Edit profile
            </button>
          </div>
        </div>
        <div className="col-12 col-md-8  col-sm-7  p-3"></div>
      </div>
    </div>
  );
}
