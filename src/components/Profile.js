import React, { Suspense } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import "styles/profile.scss";
import { AiOutlineStar } from "react-icons/ai";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Loading from "./Loading";
const EditProfile = React.lazy(() => import("./EditProfile"));
const FeedItem = React.lazy(() => import("./FeedItem"));
const Error404 = React.lazy(() => import("./Error404"));
const Posts = React.lazy(() => import("./Posts"));
const Drafts = React.lazy(() => import("./Drafts"));
const Saved = React.lazy(() => import("./Saved"));
const Followers = React.lazy(() => import("./Followers"));
const Following = React.lazy(() => import("./Following"));
const HomeSidebar = React.lazy(() => import("./HomeSidebar"));
export default function Profile() {
  const { dark } = useSelector((state) => state.common);
  const { url } = useRouteMatch();
  return (
    <Switch>
      <div
        className={clsx(
          "profile py-4 px-1 p-md-4",
          dark ? "profile_dark" : "profile_light"
        )}
      >
        <div className="container mx-auto">
          <div className="row g-5 justify-content-between ">
            <div className="col-12 main-section col-md-9">
              <Route path={`${url}/`} exact>
                <Suspense fallback={<Loading />}>
                  <div className="profile-section  p-3">
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
                        <b>7</b> &nbsp; followers &nbsp; &bull; &nbsp;<b>10</b>
                        &nbsp; following
                      </div>
                      <div className="address">
                        <IoLocationOutline className="icon" /> Lives in
                        Kathmandu
                      </div>
                      <div className="joined">
                        <AiOutlineStar className="icon" /> Joined 3 days ago
                      </div>
                      <Link
                        to={`${url}/edit`}
                        className="edit-profile-btn btn btn-sm btn-light px-4 d-inline"
                      >
                        Edit profile
                      </Link>
                    </div>
                  </div>
                  <div className=" profile-feed-section  p-3">
                    <h4>My posts</h4>
                    <Suspense fallback={<Loading />}>
                      <FeedItem />
                      <FeedItem />
                      <FeedItem />
                      <FeedItem />
                      <FeedItem />
                      <FeedItem />
                    </Suspense>
                  </div>
                </Suspense>
              </Route>
              <Route path={`${url}/edit`}>
                <Suspense fallback={<Loading />}>
                  <EditProfile />
                </Suspense>
              </Route>
              <Route path={`${url}/posts`}>
                <Suspense fallback={<Loading />}>
                  <Posts />
                </Suspense>
              </Route>
              <Route path={`${url}/drafts`}>
                <Suspense fallback={<Loading />}>
                  <Drafts />
                </Suspense>
              </Route>
              <Route path={`${url}/saved`}>
                <Suspense fallback={<Loading />}>
                  <Saved />
                </Suspense>
              </Route>
              <Route path={`${url}/followers`}>
                <Suspense fallback={<Loading />}>
                  <Followers />
                </Suspense>
              </Route>
              <Route path={`${url}/following`}>
                <Suspense fallback={<Loading />}>
                  <Following />
                </Suspense>
              </Route>
            </div>
            <div className="sidebar-section col-md-3 p-3 d-none d-md-block">
              Quick links
              <hr className="mt-2 mb-3" />
              <Suspense fallback={<Loading />}>
                <HomeSidebar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <Route path={`${url}/*`}>
        <Suspense fallback={<Loading />}>
          <Error404 />
        </Suspense>
      </Route>
    </Switch>
  );
}
