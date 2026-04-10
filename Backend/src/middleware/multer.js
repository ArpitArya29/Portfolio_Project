import multer from "multer";
import fileImageFilter from "../utils/fileImageFilter.js";
import path from "path";

const storage = multer.diskStorage( {
    destination : function (req, file, cb) {
    cb(null, path.resolve("src/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix)
  }
})

const uploadImageMulter = multer( {
    storage,
    fileFilter : fileImageFilter,
})

export default uploadImageMulter;
