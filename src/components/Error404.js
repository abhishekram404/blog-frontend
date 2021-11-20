import React from "react";
import { useHistory } from "react-router-dom";
export default function Error404() {
  const history = useHistory();
  const goback = () => history.goBack();
  return (
    <div className="error-page">
      <div className="container">
        <h1>Error 404 !</h1>
        <h4>The page that you requested was not found. </h4>
        <button className="btn btn-primary mt-3" onClick={goback}>
          Go to previous page
        </button>
      </div>
    </div>
  );
}
