const fs = require('fs')

let dir = process.argv[2]
let file_ext = "." + process.argv[3]
fs.readdir(dir, (err, file) => {
    file.filter((e) => {if (e.endsWith(file_ext)) {console.log(e)}})
})