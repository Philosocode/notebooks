const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./catch-async.middleware");

// Store image in memory/buffer
const multerStorage = multer.memoryStorage();

// Only allow image uploads
const multerFilter = (_, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only images are allowed.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single("image");

exports.resizeImage = catchAsync(async (req, _, next) => {
  if (!req.file) return next();

  // req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  const originalNameSplit = req.file.originalname.split(".");
  originalNameSplit.pop();

  const nameWithoutExtension = originalNameSplit.join("");

  req.file.filename = `${nameWithoutExtension}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize({ width: 600 })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/uploads/images/${req.file.filename}`);

  next();
});
