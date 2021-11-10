import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import "styles/draftItem.scss";
export default function DraftItem() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "draft-item mb-3 row card align-items-center flex-column",
        dark ? "draft-item-dark" : "draft-item-light"
      )}
    >
      <div className="col title-row p-3">
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
          officiis?
        </h4>
      </div>
      <div className="col buttons-row px-3 py-2">
        <button className="btn btn-light btn-sm me-2 shadow-none">Edit</button>
        <button className="btn btn-danger btn-sm me-2 shadow-none">
          Delete
        </button>
        <button className="btn btn-primary btn-sm me-2 shadow-none">
          Publish
        </button>
      </div>
    </div>
  );
}
