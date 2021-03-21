const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     const extRegex = new RegExp(/[\.][a-z]*$/, 'gi')
//     const ext = file.originalname.match(extRegex)[0].slice(1)
//     const uniqueSuffix = Date.now()
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
//   },
// })

module.exports = upload
