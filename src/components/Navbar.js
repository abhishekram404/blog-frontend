import clsx from "clsx";
import React from "react";
import "styles/navbar.scss";
export default function Navbar() {
  return (
    <div className={clsx("navbar px-4 py-2", "navbar_dark")}>
      <div className="container">
        <a href="#" className="navbar-brand">
          Blog
        </a>
      </div>
    </div>
  );
}
