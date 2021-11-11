const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
router.post("/create-post", auth, postController.createPost);
router.get("/fetchHomepagePosts", postController.fetchHomepagePosts);

module.exports = router;
