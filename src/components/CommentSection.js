import React from "react";

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
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

const Comment = () => {
  return (
    <div className="comment">
      <div className="avatar">
        <img
          src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
          alt=""
        />
      </div>
      <div className="comment-details">
        <h6 className="comment-user">Abhishek Ram</h6>
        <p className="comment-text mb-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus
          rem doloremque. Autem corrupti molestiae velit ullam consequatur qui
          amet laboriosam ducimus quis neque necessitatibus asperiores, magni
          itaque saepe blanditiis.
        </p>
        <small className="comment-time">2 min ago</small>
      </div>
    </div>
  );
};
