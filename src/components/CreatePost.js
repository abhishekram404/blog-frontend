import React, { useState, useCallback, Suspense } from "react";
import clsx from "clsx";
import "styles/createPost.scss";
import { WithContext as ReactTags } from "react-tag-input";
import { pascalCase } from "change-case";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { debounce as db } from "lodash";
import { AiOutlineEye } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import Loading from "./Loading";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ERROR, INFO, SUCCESS } from "redux/constants";
import { withRouter, useHistory } from "react-router-dom";
const CKEditor = React.lazy(() => import("react-ckeditor-component"));
const Post = React.lazy(() => import("./Post"));
function CreatePost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dark } = useSelector((state) => state.common);
  const [tags, setTags] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Undefined",
    tags: [],
    content: "",
  });
  const validatonSchema = Yup.object({
    title: Yup.string().required("Post title is required."),
    category: Yup.string(),
    tags: Yup.array(),
    content: Yup.string(),
  });

  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };
  const delimiters = [...KeyCodes.enter, KeyCodes.comma];
  const handleAdd = (tag) => {
    tag = pascalCase(tag.text);
    if (!tag) {
      return;
    }
    if (tags.some((tagText) => tagText.text === tag)) {
      return;
    }
    setTags([...tags, { id: tag, text: tag }]);
  };
  const handleDelete = (indexToRemove) => {
    setTags(() => tags.filter((_, i) => indexToRemove !== i));
  };

  const debounce = useCallback(
    db((value) => {
      setFormData(Object.assign(formData, { content: value }));
    }, 300),
    []
  );

  const generatePreviewData = (values) => {
    let tagsList = [];
    tags.forEach((tagObj) => {
      tagsList.push(tagObj.id);
    });
    setFormData(
      Object.assign(
        formData,
        { title: values.title, category: values.category },
        { tags: tagsList }
      )
    );
  };

  const handleSubmit = async (values, props) => {
    try {
      await generatePreviewData(values);
      const { data } = await axios.post(
        "/post/create-post?submitType=publish",
        formData
      );

      const { success, message } = await data;
      switch (success) {
        case true:
          props.resetForm();
          setFormData({
            title: "",
            category: "",
            tags: [],
            content: "",
          });

          dispatch({
            type: SUCCESS,
            payload: message,
          });

          history.push("/");
          return;
        case false:
          return dispatch({
            type: ERROR,
            payload: message,
          });
        default:
          return dispatch({
            type: INFO,
            payload: message,
          });
      }
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error?.response?.data.message,
      });
    }
  };

  const handleDraftSubmit = async (props) => {
    try {
      await generatePreviewData(props.values);
      const { data } = await axios.post(
        "/post/create-post?submitType=draft",
        formData
      );
      const { success, message } = await data;
      switch (success) {
        case true:
          props.resetForm();
          setFormData({
            title: "",
            category: "",
            tags: [],
            content: "",
          });
          dispatch({
            type: SUCCESS,
            payload: message,
          });
          history.push("/");
          return;
        case false:
          return dispatch({
            type: ERROR,
            payload: message,
          });
        default:
          return dispatch({
            type: INFO,
            payload: message,
          });
      }
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error?.response?.data.message,
      });
    }
  };

  return (
    <div
      className={clsx(
        "create_post py-4 p-2 p-sm-4",
        dark ? "create_post_dark" : "create_post_light"
      )}
    >
      <div className="container">
        <div className="row mb-2 align-items-center">
          <div className="col-8 col-sm-9">
            <h2>{previewMode ? "Preview mode" : "Create a post"}</h2>
          </div>
          <div className="col-4 col-sm-3 preview-btn ">
            <button
              className="btn btn-sm  ms-auto shadow-none"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? (
                <>
                  Edit <IoCreateOutline />
                </>
              ) : (
                <>
                  {" "}
                  Preview <AiOutlineEye />
                </>
              )}
            </button>
          </div>
        </div>
        {previewMode ? (
          <Suspense fallback={<Loading />}>
            <Post
              title={formData.title}
              category={formData.category}
              body={formData.content}
              preview={true}
            />
          </Suspense>
        ) : (
          <Formik
            initialValues={formData}
            onSubmit={handleSubmit}
            validationSchema={validatonSchema}
          >
            {(props) => (
              <Form
                className="p-3"
                onBlur={() => generatePreviewData(props.values)}
              >
                <div className="mb-3">
                  <Field
                    as="textarea"
                    onKeyDown={(e) => {
                      if (parseInt(e.target.style.height) >= 300) {
                        return;
                      }
                      e.target.style.height = "inherit";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    name="title"
                    className="form-control shadow-none post-title"
                    placeholder="New post title here"
                  />
                  <small className="text-danger">
                    <ErrorMessage name="title" />
                  </small>
                </div>
                <div className="mb-3 tags-cont">
                  <label htmlFor="post-tags" className="form-label">
                    Tags
                  </label>
                  <ReactTags
                    tags={tags}
                    autofocus={false}
                    handleAddition={handleAdd}
                    handleDelete={handleDelete}
                    delimiters={delimiters}
                    inputFieldPosition="inline"
                    allowUnique={false}
                    classNames={{
                      tags: "tags",
                      tag: "tag",
                      tagInput: "tagInput",
                      tagInputField: "tagInputField",
                      remove: "tagRemoveBtn",
                    }}
                  />
                </div>
                <div className="mb-3 category-cont">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className="form-control shadow-none"
                  >
                    <option value="Undefined">Undefined</option>
                    <option value="Crime">Crime</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Fashion">Fashion</option>
                    <option value="DIY">DIY</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="E-sports">E-sports</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Business">Business</option>
                    <option value="Politics">Politics</option>
                    <option value="Movie">Movie</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="News">News</option>
                  </Field>
                </div>
                <div className="editor-cont mb-3">
                  <label htmlFor="post-body" className="form-label">
                    Body
                  </label>

                  <Suspense fallback={<Loading />}>
                    <CKEditor
                      content={formData.content}
                      activeClass="editor"
                      events={{
                        change: (e) => debounce(e.editor.getData()),
                      }}
                      config={{
                        removeButtons:
                          "Cut,Copy,Paste,Anchor,Scayt,PasteText,PasteFromWord,About",
                      }}
                    />
                  </Suspense>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary shadow-none me-3"
                    onClick={() => {
                      handleDraftSubmit(props);
                    }}
                    type="button"
                  >
                    Save draft
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary  shadow-none"
                    disabled={!props.isValid}
                  >
                    Post
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default withRouter(CreatePost);
