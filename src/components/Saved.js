import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
export default function Saved() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div className={clsx("saved", dark ? "saved-dark" : "saved-light")}>
      <h3>Saved</h3>
    </div>
  );
}
