import { diskStorage } from "multer"
import{ extname, join } from "path"
import {v4 as uuidv4} from 'uuid'



const rootPath = process.cwd()

export const multerConfig = {
    storage: diskStorage({
        destination: function (req, file, cb) {
            let folder:string
            if (file.mimetype.startsWith('image/')){
              folder = 'images'
            } else {
              folder = 'other'
            }
            cb(null, join(rootPath,'files', 'uploads', folder))
          },
          filename: function (req, file, cb) {
            const uniqueName = uuidv4()
            cb(null, uniqueName + extname(file.originalname))
          }
    })
  }