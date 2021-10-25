import clsx from "clsx";
import React from "react";
import * as styles from "styles/navbar.module.css";
export default function Navbar() {
  console.log(styles);
  return (
    <div
      className={clsx("navbar  px-4 py-2", styles.navbar_dark, styles.navbar)}
    >
      <a href="#" className="navbar-brand">
        Blog
      </a>
    </div>
  );
}
