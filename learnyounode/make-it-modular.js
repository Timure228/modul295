const mymodule = require('./mymodule.js')

let dir = process.argv[2]
file_ext = "." + process.argv[3]

function fil(e, file_ext) {
    e.filter((file) => {
        if(file.endsWith(file_ext)) {
            console.log()
        }
    })
}

mymodule(dir, file_ext, fil)
