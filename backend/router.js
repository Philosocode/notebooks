const express = require("express");

const googleLogin = require("./handlers/auth/googleLogin");
const getUsers = require("./handlers/user/getUsers.handler");
const protect = require("./middlewares/protect.middleware");

// const logger = require("./utils/logger");

const router = express.Router();

// auth
router.post("/auth/google", googleLogin);

router.get("/", protect, getUsers);

module.exports = router;