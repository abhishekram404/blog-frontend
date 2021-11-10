import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
export default function Followers() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "followers py-4 px-1 p-md-4",
        dark ? "followers-dark" : "followers-light"
      )}
    >
      Followers
    </div>
  );
}
