import multer from "multer"
import { fileURLToPath } from 'url'
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log("DirName", __dirname)
const storage = multer.diskStorage({
      destination: (req, file, next) => {
            next(null, path.join(__dirname, '../inputFolder'))
      },
      filename: (req, file, next) => {
            console.log("InputFileName", file)
            next(null, file.originalname)
      }
})

export const upload = multer({ storage })
