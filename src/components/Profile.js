import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function Profile() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "profile py-4 px-1 p-md-4",
        dark ? "profile_dark" : "profile_light"
      )}
    >
      <div className="container">This is the profile</div>
    </div>
  );
}
