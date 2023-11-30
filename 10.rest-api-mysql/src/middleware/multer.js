const multer = require("multer");
// const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    // const extension = path.extname(file.originalname);

    cb(null, `${timestamp}-${fileName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000 * 1000, //1mb user tidak bisa upload lebih dari 1 mb
  },
});

module.exports = upload;
