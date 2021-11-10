import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
export default function Saved() {
  const { dark } = useSelector((state) => state.common);
  return <div className={clsx("saved py-4 px-1 p-md-4")}>Saved</div>;
}
