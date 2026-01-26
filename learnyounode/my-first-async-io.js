const fs = require('fs')
fs.readFile(process.argv[2], "utf8", ((err, file) => console.log(file.toString().split("\n").length - 1)))