const jwt = require("jsonwebtoken");

const AppError = require("../utils/app-error.util");
const catchAsync = require("../middlewares/catch-async.middleware");

module.exports = catchAsync(async function login(req, res, next) {
  const { name, email, password } = req.body;

  // check if user already exists


  console.log(name, email, password);

  res.status(200).json({
    status: "success",
    data: {
      name,
      email,
      password,
    }
  });
});