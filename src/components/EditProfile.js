import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "styles/editProfile.scss";
import * as Yup from "yup";
export default function EditProfile() {
  const { dark } = useSelector((state) => state.common);

  const schema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long.")
      .max(60, "Name must be maximum 30 characters long.")
      .required("Name is required."),
    username: Yup.string()
      .min(3, "Username must be minimum 3 characters long.")
      .max(30, "Username must be maximum 30 characters long.")
      .required("Username is required."),
    bio: Yup.string().max(200, "Bio must be maximum 200 characters long."),
    email: Yup.string().email("Invalid email").required("Email is required."),
    dob: Yup.date(),
    address: Yup.string(),
  });

  const initialValues = {
    name: "",
    username: "",
    bio: "",
    email: "",
    dob: "",
    address: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div
      className={clsx(
        "edit-profile  px-1 px-md-4 py-4",
        dark ? "edit-profile-dark" : "edit-profile-light"
      )}
    >
      <div className="container">
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form className="card p-4">
              <h2>Edit profile</h2>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field className="form-control" name="name" />
                <small className="error-msg text-danger">
                  <ErrorMessage name="name" />
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <Field className="form-control" name="username" />
                <small className="error-msg text-danger">
                  <ErrorMessage name="username" />
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <Field className="form-control" name="bio" />
                <small className="error-msg text-danger">
                  <ErrorMessage name="bio" />
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field className="form-control" name="email" type="email" />
                <small className="error-msg text-danger">
                  <ErrorMessage name="email" />
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of birth
                </label>
                <Field className="form-control" name="dob" type="date" />
                <small className="error-msg text-danger">
                  <ErrorMessage name="dob" />
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <Field className="form-control" name="address" />
                <small className="error-msg text-danger">
                  <ErrorMessage name="address" />
                </small>
              </div>
              <div className="">
                <button className="btn me-2 cancel-btn">Cancel</button>
                <button type="submit" className="btn btn-primary submit-btn">
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
