import React, { useState } from "react";
import "styles/register.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  ERROR,
  SUCCESS,
} from "redux/constants";
import { Redirect } from "react-router";
import { useCookies } from "react-cookie";

export default function Login() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [jwtCookie, setJwtCookie] = useCookies(["jwt"]);

  const isProduction = process.env.REACT_APP_NODE_ENV === "production";
  const dispatch = useDispatch();
  const { dark, isUserLoggedIn } = useSelector((state) => state.common);
  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialValues = { email: "", password: "" };
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const { data, headers } = await axios.post("/user/login", values);
      setSubmitting(false);

      switch (data.success) {
        case true:
          console.log(headers);
          const token = headers.authorization.split(" ")[1];
          const secure = Boolean(Number(headers.secure));
          const domain = headers.domain;
          const maxAge = Number(headers.maxAge);
          setJwtCookie("jwt", token, {
            path: "/",
            httpOnly: true,
            secure,
            domain,
            maxAge,
            sameSite: "None",
          });
          console.log(domain);
          dispatch({ type: AUTHENTICATED });
          return dispatch({ type: SUCCESS, payload: data.message });
        case false:
          dispatch({ type: NOT_AUTHENTICATED });
          return dispatch({ type: ERROR, payload: data.message });
        default:
          dispatch({ type: NOT_AUTHENTICATED });
          return dispatch({ type: ERROR, payload: "Something went wrong!" });
      }
    } catch (error) {
      setSubmitting(false);
      dispatch({ type: NOT_AUTHENTICATED });
      dispatch({ type: ERROR, payload: error.response.data.message });
    }
  };

  if (isUserLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div
      className={clsx(
        "register py-4 px-1 p-md-4",
        dark ? "register_dark" : "register_light"
      )}
    >
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {(errors, touched) => (
            <Form className={clsx("card p-4", isSubmitting && "disabled")}>
              <h2 className="text-center">Login</h2>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  className="form-control shadow-none"
                  required={true}
                />
                <small className="error-message text-danger">
                  <ErrorMessage name="email" />
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control shadow-none"
                  required={true}
                />
                <small className="error-message text-danger">
                  <ErrorMessage name="password" />
                </small>
              </div>

              <button type="submit" className="submit-btn btn btn-primary">
                {isSubmitting ? "Logging In" : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
