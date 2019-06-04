const router = require("express").Router();
const userAuth = require("../middleware/userAuth");

const userRoutes = require("./users");
const postRoutes = require("./posts");

router.use("/users", userRoutes);
router.use("/posts", userAuth, postRoutes);

module.exports = router;
