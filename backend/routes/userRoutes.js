const router = require("express").Router();
const userController = require("../controllers/userController");
router.get("/", (req, res) => {
  res.send("User Route");
});

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get(
  "/checkUsernameAvailability",
  userController.checkUsernameAvailability
);
module.exports = router;
