import React, { Suspense, useEffect } from "react";
import "styles/Homepage.scss";
import clsx from "clsx";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { fetch_posts } from "redux/actions/postActions";
import { fetch_user_info } from "redux/actions/userActions";
const FeedItem = React.lazy(() => import("./FeedItem"));
const HomeSidebar = React.lazy(() => import("./HomeSidebar"));
export default function Homepage() {
  const dispatch = useDispatch();
  const { dark, isUserLoggedIn } = useSelector((state) => state.common);
  const { fetchedPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetch_posts());
    dispatch(fetch_user_info());
  }, []);

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
            <Suspense fallback={<Loading />}>
              {fetchedPosts && fetchedPosts.length > 0 ? (
                fetchedPosts.map((post) => (
                  <FeedItem
                    title={post.title}
                    content={post.content}
                    likes={post.likes.length}
                    comments={post.comments.length}
                    category={post.category}
                    author={post.author}
                    key={post._id}
                  />
                ))
              ) : (
                <h4>No posts</h4>
              )}
            </Suspense>
          </div>

          {/* Sidebar is commented for now */}
          {isUserLoggedIn && (
            <div className="col-md-3 sidebar-section p-3 d-none d-md-block">
              Quick links
              <hr className="mt-2 mb-3" />
              <Suspense fallback={<Loading />}>
                <HomeSidebar />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
