import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import "styles/register.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function Register() {
  const { dark } = useSelector((state) => state.common);
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  };
  const registerSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long.")
      .max(60, "Name too long!")
      .required("Name is required."),
    username: Yup.string()
      .min(3, "Username too short.")
      .max(32, "Username too long.")
      // .matches(
      //   /[a-z]*/g,
      //   "Username must only contain lowercase letters, numbers, and underscore."
      // )
      .required("Username is required."),
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string()
      .min(6, "Password too short.")
      .max(256, "Password too long.")
      .required("Password is required."),
    repassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both passwords must match."
    ),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };
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
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {(errors, touched) => (
            <Form className="card p-4">
              <h2 className="text-center">Register</h2>
              {/* <hr className="mt-1" /> */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <Field
                  type="text"
                  className="form-control shadow-none"
                  required={true}
                  name="name"
                />
                <small className="error-message text-danger">
                  <ErrorMessage name="name" />
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username <span className="text-danger">*</span>
                </label>
                <Field
                  type="text"
                  className="form-control shadow-none"
                  required={true}
                  name="username"
                />
                <small className="error-message text-danger">
                  <ErrorMessage name="username" />
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <Field
                  type="email"
                  className="form-control shadow-none"
                  required={true}
                  name="email"
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
              <div className="mb-3">
                <label htmlFor="repassword" className="form-label">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <Field
                  type="password"
                  name="repassword"
                  className="form-control shadow-none"
                  required={true}
                />
                <small className="error-message text-danger">
                  <ErrorMessage name="repassword" />
                </small>
              </div>
              <button type="submit" className="submit-btn btn btn-primary">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
