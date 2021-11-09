import clsx from "clsx";
import React, { useState, useCallback } from "react";
import "styles/createPost.scss";
import CKEditor from "react-ckeditor-component";
import { WithContext as ReactTags } from "react-tag-input";
import { pascalCase } from "change-case";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import _ from "lodash";
import { AiOutlineEye } from "react-icons/ai";
import Post from "./Post";
import { IoCreateOutline } from "react-icons/io5";
export default function CreatePost() {
  const { dark } = useSelector((state) => state.common);
  const [tags, setTags] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    content: "",
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
    _.debounce((value) => {
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

  const handleSubmit = (values) => {
    generatePreviewData(values);
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
          <Post
            title={formData.title}
            category={formData.category}
            body={formData.content}
            preview={true}
          />
        ) : (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
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

                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary shadow-none me-3">
                    Save draft
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary  shadow-none"
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
