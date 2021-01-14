const express = require("express");
const getUsers = require("./handlers/user/getUsers.handler");

// const logger = require("./utils/logger");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;