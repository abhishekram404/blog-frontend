import React from "react";
import { Link } from "react-router-dom";
import {
  MdNotificationAdd,
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkAdded,
} from "react-icons/md";
import { BiComment, BiLike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import featuredImage from "assets/featured.jpg";
import "styles/feedItem.scss";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { AiOutlineUserAdd } from "react-icons/ai";
import parser from "html-react-parser";
const FeedItem = ({
  title,
  content,
  category,
  author,
  likes,
  comments,
  selfMode,
}) => {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "border-1  card feed-item mb-4",
        dark ? "feed-item-dark" : "feed-item-light"
      )}
    >
      <div className="thumbnail-cont">
        <img 
          src={featuredImage}
          alt="Thumbnail"
          className="card-img-top thumbnail-image"
        />
      </div>
      <div className="card-body post-cont">
        <Link to="/post">
          <h3 className="card-title post-title">{title}</h3>
          <p className="card-text post-body">{parser(content)}</p>
        </Link>
      </div>
      <div className="card-body interaction-cont py-1 row align-items-center justify-content-center">
        <div className="col-1">
          <BiLike />
          <span>{likes}</span>
        </div>
        <div className="col-1">
          <BiComment />
          <span>{comments}</span>
        </div>
        <div className="col-1 single-childed">
          <IoIosShareAlt />
        </div>
        <div className="col-8"></div>
        <div className="col-1 single-childed">
          <MdOutlineBookmarkAdd />
        </div>
      </div>
      <div className="card-body py-1">
        <div className="row  align-items-center g-2 py-2">
          {selfMode ? (
            <>
              <button className="col edit-btn btn  me-1 ">Edit</button>
              <button className="col delete-btn btn btn-danger ms-1">
                Delete
              </button>
            </>
          ) : (
            <>
              <div className="col-2 col-sm-1 p-1 profile-pic-cont ">
                <img
                  src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
                  alt="Profile"
                  className="profile-pic"
                />
              </div>
              <div className="col-7 col-sm-7 px-1 px-sm-3 px-md-3 d-flex flex-column">
                <span className="author-name">{author.authorName}</span>
                <small className="author-username">
                  <Link to="/user/abhishek">@{author.authorUsername}</Link>
                </small>
              </div>
              <div className="col col-sm-3 ms-auto px-0">
                <button className="btn shadow-none  follow-btn float-end">
                  <AiOutlineUserAdd className="icon " />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default FeedItem;
