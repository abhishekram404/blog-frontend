import React, { Suspense } from "react";
import "styles/Homepage.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Loading from "./Loading";
const FeedItem = React.lazy(() => import("./FeedItem"));
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
            <Suspense fallback={<Loading />}>
              <FeedItem />
              <FeedItem />
              <FeedItem />
              <FeedItem />
              <FeedItem />
              <FeedItem />
            </Suspense>
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
