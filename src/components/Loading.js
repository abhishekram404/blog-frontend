import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import "styles/loading.scss";
export default function Loading() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx("loader", dark ? "loader-dark" : "loader-light")}
    ></div>
  );
}
