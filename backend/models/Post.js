const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [],
      default: "Undefined",
    },
    tags: {
      type: [String],
      required: true,
    },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    published: {
      type: Boolean,
      default: false,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    noOfBookmarks: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
