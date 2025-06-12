const express = require("express");
const userRouter = express.Router();

const userController = require("../controller/userController");

userRouter.post("/signin", userController.signIn);
userRouter.post("/login", userController.login);

module.exports = userRouter;
