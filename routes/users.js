var express = require("express");
var router = express.Router();
const {
  createUser,
  logIn,
  getUser,
  logOut,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middleware/authenticateUser");

/* GET users listing. */

router.post("/create", createUser);
router.post("/logIn", logIn);
router.get("/", isAuthenticated, getUser);
router.delete("/logOut", isAuthenticated, logOut);

module.exports = router;
