const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteuser,
  updateUser,
  logoutUser,
} = require("../controller/user.controller.js");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/getAllUsers", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteuser);
router.put("/:id", updateUser);
module.exports = router;
