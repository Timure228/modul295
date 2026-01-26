const fs = require('fs')

module.exports = function count_dir(dir_name, file_ext, callback_fun) {
    fs.readdir(dir_name, (err, file) => {
        if (err) {return callback_fun(err)}
        callback_fun(file, file_ext)
    })
}
