import React, { Suspense } from "react";
import Loading from "./Loading";
const Comment = React.lazy(() => import("./Comment"));

export default function CommentSection() {
  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <form>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="5"
          className="form-control shadow-none"
          placeholder="What are your thoughts about the post ?"
        ></textarea>
        <button type="submit" className="btn mt-3 btn-primary">
          Comment
        </button>
      </form>
      <br />
      <br />
      <Suspense fallback={<Loading />}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Suspense>
    </div>
  );
}
