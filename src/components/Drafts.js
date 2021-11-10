import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
export default function Drafts() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "drafts py-4 px-1 p-md-4",
        dark ? "drafts-dark" : "drafts-light"
      )}
    >
      Drafts
    </div>
  );
}
