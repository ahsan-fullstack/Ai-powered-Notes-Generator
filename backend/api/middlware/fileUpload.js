import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'upload/')
  },
  filename: (req, file, cb) => {
    const extractName = path.extname(file.originalname);
    const uniqeName = Date.now() + extractName;
    cb(null, uniqeName)
  }

})

const upload = multer({ storage });

export default upload;