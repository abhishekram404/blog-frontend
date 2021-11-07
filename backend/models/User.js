const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 256,
      select: false,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    userComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    userLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "joined",
    },
  }
);

userSchema.method("generateToken", () => {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JSON_SECRET || "VERYSECRETANDSTRONGKEY"
  );
});

const User = mongoose.model("User", userSchema);
module.exports = User;
