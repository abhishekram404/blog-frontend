import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import "styles/drafts.scss";
const DraftItem = React.lazy(() => import("./DraftItem"));
export default function Drafts() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div className={clsx("drafts  ", dark ? "drafts-dark" : "drafts-light")}>
      <h3>Drafts</h3>
      <div className="drafts-list p-2">
        <Suspense fallback={<Loading />}>
          <DraftItem />
          <DraftItem />
          <DraftItem />
          <DraftItem />
          <DraftItem />
          <DraftItem />
        </Suspense>
      </div>
    </div>
  );
}
