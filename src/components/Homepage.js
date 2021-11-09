import React from "react";
import HomeSidebar from "./HomeSidebar";
import "styles/Homepage.scss";
import featuredImage from "assets/featured.jpg";
import {
  MdNotificationAdd,
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkAdded,
} from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiComment, BiLike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
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

          {/* Sidebar is commented for now */}
          {/* <div className="col-3  card p-3 d-none d-md-block">
            <HomeSidebar />
          </div> */}
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
      <div className="card-body interaction-cont py-1 row align-items-center justify-content-center">
        <div className="col-1">
          <BiLike />
          <span>2k</span>
        </div>
        <div className="col-1">
          <BiComment />
          <span>20k</span>
        </div>
        <div className="col-1 single-childed">
          <IoIosShareAlt />
          {/* <span>200</span> */}
        </div>
        <div className="col-8"></div>
        <div className="col-1 single-childed">
          <MdOutlineBookmarkAdd />
        </div>
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
          <div className="col-7 col-sm-7 px-1 px-sm-3 px-md-3 d-flex flex-column">
            <span className="author-name">Abhishek Ram</span>
            <small className="author-username">
              <Link to="/user/abhishek">@abhishek</Link>
            </small>
          </div>
          <div className="col col-sm-3 ms-auto px-0">
            <button className="btn shadow-none  follow-btn float-end">
              <MdNotificationAdd className="icon " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
