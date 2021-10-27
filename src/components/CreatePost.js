import clsx from "clsx";
import React, { useState, useRef } from "react";
import "styles/createPost.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CLassicEditor from "@ckeditor/ckeditor5-build-classic";
import { WithContext as ReactTags } from "react-tag-input";
import { pascalCase } from "change-case";
import { useSelector } from "react-redux";
export default function CreatePost() {
  const { dark } = useSelector((state) => state.common);
  const [tags, setTags] = useState([]);
  //   const [suggestions, setSuggestions] = useState([
  //     { id: "Technology", text: "Technology" },
  //     { id: "Business", text: "Business" },
  //     { id: "JavaScript", text: "JavaScript" },
  //   ]);

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
  const textarea = useRef(null);

  return (
    <div
      className={clsx(
        "create_post py-4 p-2 p-sm-4",
        dark ? "create_post_dark" : "create_post_light"
      )}
    >
      <div className="container">
        <h2>Create a post</h2>
        <form className="p-3">
          <div className="mb-3">
            {/* <label htmlFor="post-title" className="form-label">
              Title
            </label> */}
            <textarea
              onKeyDown={(e) => {
                if (parseInt(e.target.style.height) >= 300) {
                  return;
                }
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              ref={textarea}
              type="text"
              className="form-control shadow-none post-title"
              placeholder="New post title here"
            ></textarea>
          </div>
          <div className="mb-3 tags-cont">
            <label htmlFor="post-tags" className="form-label">
              Tags
            </label>
            <ReactTags
              tags={tags}
              //   suggestions={suggestions}
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
          <div className="editor-cont mb-3">
            <label htmlFor="post-body" className="form-label">
              Body
            </label>
            <CKEditor
              editor={CLassicEditor}
              id="editor"
              config={{
                height: "600",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "bulletedList",
                  "imageUpload",
                  "insertTable",
                  "tableColumn",
                  "tableRow",
                  "mergeTableCells",
                  "mediaEmbed",
                  "|",
                  "undo",
                  "redo",
                ],
                //   plugins: [CodeBlock],
              }}
              onChange={(event, editor) => {
                console.log(editor.getData());
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary shadow-none me-3">
              Save draft
            </button>
            <button type="submit" className="btn btn-primary  shadow-none">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
