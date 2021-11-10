import clsx from "clsx";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
export default function Following() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "following py-4 px-1 p-md-4",
        dark ? "following-dark" : "following-light"
      )}
    >
      Following
    </div>
  );
}
