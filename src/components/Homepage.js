import React from "react";
import HomeSidebar from "./HomeSidebar";
import "styles/Homepage.scss";
import featuredImage from "assets/featured.jpg";
import { MdNotificationAdd } from "react-icons/md";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Homepage() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "homepage px-1 px-md-4 py-4",
        dark ? "homepage_dark" : "homepage_light"
      )}
    >
      <div className="container  mx-auto">
        <div className="row g-5">
          <div className="col-12 feed col-md-9">
            <h2 className="page-title">Feed</h2>
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
          </div>
          <div className="col-3  card p-3 d-none d-md-block">
            <HomeSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

const FeedItem = () => {
  return (
    <div className="border-1  card feed-item mb-4">
      <div className="thumbnail-cont">
        <img
          src={featuredImage}
          alt="Thumbnail"
          className="card-img-top thumbnail-image"
        />
      </div>
      <div className="card-body post-cont">
        <Link to="/post">
          <h3 className="card-title post-title">Post title</h3>
          <p className="card-text post-body">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
            similique aliquid rerum ipsam totam animi possimus, culpa corporis
            hic pariatur?
          </p>
        </Link>
      </div>

      <div className="card-body py-1">
        <div className="row  align-items-center g-3">
          <div className="col-2 col-sm-1 p-1 profile-pic-cont ">
            <img
              src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="col-7 col-sm-8 px-1 px-sm-3 px-md-3 d-flex flex-column">
            <span className="author-name">Abhishek Ram</span>
            <small className="author-username">
              <Link to="/user/abhishek">@abhishek</Link>
            </small>
          </div>
          <div className="col-3 col-sm-3">
            <button className="btn shadow-none  follow-btn float-end">
              <MdNotificationAdd className="icon " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
