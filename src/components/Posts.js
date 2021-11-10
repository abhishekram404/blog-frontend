import clsx from "clsx";
import React, { Suspense } from "react";
import "styles/posts.scss";
import { useSelector } from "react-redux";
import Loading from "./Loading";
const FeedItem = React.lazy(() => import("./FeedItem"));
export default function Posts() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div className={clsx("posts", dark ? "posts-dark" : "posts-light")}>
      <h3>My Posts</h3>
      <div className="posts-list p-3">
        <Suspense fallback={<Loading />}>
          <FeedItem selfMode={true} />
          <FeedItem selfMode={true} />
          <FeedItem selfMode={true} />
          <FeedItem selfMode={true} />
          <FeedItem selfMode={true} />
        </Suspense>
      </div>
    </div>
  );
}
