import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

export default function Settings() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "settings py-4 px-1 p-md-4",
        dark ? "settings-dark" : "settings-light"
      )}
    ></div>
  );
}
