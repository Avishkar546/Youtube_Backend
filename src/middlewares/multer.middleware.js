import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E3)
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage });