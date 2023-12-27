const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const isImageType =
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png";

  cb(null, isImageType);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter,
});

export default upload;
