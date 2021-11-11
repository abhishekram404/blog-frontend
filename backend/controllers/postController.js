const Post = require("../models/Post");
const User = require("../models/User");
module.exports.createPost = async (req, res) => {
  try {
    const { title, tags, category, content } = await req.body;

    const { submitType } = await req.query;

    if (!title) {
      return res
        .send({
          success: false,
          message: "Post needs a title.",
        })
        .status(400);
    }

    const newPost = await Post.create({
      title: title.trim(),
      content,
      category: category.trim(),
      tags,
      author: req.authUserId,
      published: submitType === "draft" ? false : true,
    });
    await User.findByIdAndUpdate(
      req.authUserId,
      {
        $push: { posts: newPost._id },
      },
      {
        new: true,
        multi: false,
      }
    );
    res.status(200).send({
      success: true,
      message: "Post created successfully.",
      details: newPost,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error creating new post. Please try again.",
    });
  }
};
