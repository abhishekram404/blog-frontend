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

module.exports.fetchHomepagePosts = async (req, res) => {
  try {
    const posts = await Post.find(
      {},
      "title content category author likes comments"
    )
      .sort({ _createAt: -1 })
      .limit(5)
      .lean();

    let result = posts.map(async (post) => {
      let author = await User.findById(post.author, "name username").lean();
      return {
        ...post,
        author,
      };
    });
    Promise.all(result).then((r) => {
      return res.send({
        success: true,
        message: "Posts fetched successfully",
        details: r,
      });
    });

    // console.log(await result);

    // const embedAuthorInfo = (posts) => {
    //   var result = [];
    //   posts.forEach(async (post) => {
    //     let author = await User.findById(post.author, "name username").lean();
    //     await result.push({
    //       ...post,
    //       author: {
    //         name: author.name,
    //         username: author.username,
    //       },
    //     });
    //     console.log(result);
    //   });
    //   return result;
    // };
    // let r = await embedAuthorInfo(posts);
    // console.log(r);
  } catch (error) {
    console.log(error);
  }
};
