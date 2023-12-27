import multer from "multer";
import sharp from "sharp";

const createMulterMiddleware = (type: string) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
        cb(null, `uploads/${type}/`);
      },
      filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
    limits: {
      fileSize: 1024 * 1023 * 2,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      const isImageType =
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png";

      cb(null, isImageType);
    },
  }).single("image");
};

export const postUpload = createMulterMiddleware("posts");
export const profileUpload = createMulterMiddleware("avatars");

export const resizeImage = (req: any, res: any, next: any) => {
  if (!req.file) {
    return next();
  }

  sharp(req.file.path)
    .resize({ width: 300, height: 300 })
    .toFile(`uploads/resized/${req.file.filename}`, (err: any) => {
      if (err) {
        return next(err);
      }

      req.file.path = `uploads/resized/${req.file.filename}`;
      next();
    });
};
