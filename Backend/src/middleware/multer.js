import multer from "multer";
import fileImageFilter from "../utils/fileImageFilter.js";

const storage = multer.memoryStorage();

const uploadImageMulter = multer( {
    storage,
    fileFilter : fileImageFilter,
})

export default uploadImageMulter;
