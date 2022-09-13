const multer = require('multer')
const path = require("path")
const fs = require('fs')

const doctorsProfilesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = path.join(process.cwd(), 'images', 'doctors-profiles')
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        const fileData = file.originalname.split(".");
        const hash = new Date().toUTCString().replace(/:/g, "-")
        const fileName = `(${hash})-(${fileData[0]}).${fileData[1]}`;
        cb(null, fileName)
    }
})
doctorsProfilesStorage.relativePath = path.join('images', 'doctors-profiles')
doctorsProfilesStorage.endPoint = '/images/doctors-profiles/'


module.exports = { doctorsProfilesStorage }