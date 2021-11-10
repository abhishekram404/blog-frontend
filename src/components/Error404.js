import React from "react";
import { Link } from "react-router-dom";
export default function Error404() {
  return (
    <div className="error-page">
      <div className="container">
        <h1>Error 404 !</h1>
        <h4>The page that you requested was not found. </h4>
        <Link to="/" className="btn-link">
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
