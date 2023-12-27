import multer from "multer";

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
      fileSize: 1024 * 1024 * 2,
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
export const profileUpload = createMulterMiddleware("profiles");
