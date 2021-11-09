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
export default Comment;
