const fileImageFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image is allowed"), false);
    }

    return cb(null, true);
}

export default fileImageFilter