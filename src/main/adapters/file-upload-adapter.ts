import multer from 'multer'
import path from 'path'

// destination to store the files
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${String(Math.floor(Math.random() * 1000))}${path.extname(file.originalname)}`)
  }
})

const fileUpload = multer({
  storage: fileStorage,
  fileFilter (req, file, cb) {
    // if (!file.originalname.match(/\.(ofx)$/)) {
    //     return cb(new Error("Por favor, envie apenas ofx!"))
    // }
    cb(null, true)
  }
})

export default fileUpload
