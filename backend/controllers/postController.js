const Post = require("../models/Post");
module.exports.createPost = async (req, res) => {
  try {
    const { title, tags, category, content } = await req.body;

    const { submitType } = await req.query;
    console.log(submitType);

    console.log(req.body);
  } catch (error) {}
};
