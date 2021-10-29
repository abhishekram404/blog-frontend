import React from "react";
import "styles/register.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function Login() {
  const { dark } = useSelector((state) => state.common);
  return (
    <div
      className={clsx(
        "register py-4 px-1 p-md-4",
        dark ? "register_dark" : "register_light"
      )}
    >
      <div className="container">
        <form className="card p-4">
          <h2 className="text-center">Login</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              required={true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control shadow-none"
              required={true}
            />
          </div>

          <button type="submit" className="submit-btn btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
