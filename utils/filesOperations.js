const fs = require("fs")
const { useError } = require("./useError")
const pathLib = require("path")
function deleteFile(relativePath) {
    const path = pathLib.join(process.cwd(), relativePath)
    if (fs.existsSync(path)) {
        fs.unlink(path, err => {
            if (err) {
                throw err
            }
        })
    } else {
        throw useError("file not exist", 404)
    }
}
exports.deleteFile = deleteFile