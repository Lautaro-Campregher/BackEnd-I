import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

const filename = fileURLToPath(import.meta.url);
export const root = dirname(filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, root + "/public/img/products");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({
  storage,
  limits: {
    fileSize: 100000,
  },
});
