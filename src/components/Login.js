import React from "react";
import "styles/register.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const { dark } = useSelector((state) => state.common);
  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialValues = { email: "", password: "" };
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
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {(errors, touched) => (
            <Form className="card p-4">
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
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
