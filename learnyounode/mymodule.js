var fs = require('fs');
var path = require('path');

function filterFiles(dir, ext, callback) {
    let filteredArray = [];
    fs.readdir(dir, function(err, files) {
     if (err) {return callback(err)}

     for(var i = 0; i < files.length; i++) {
         if (files[i].endsWith("." + ext)) {
         filteredArray.push(files[i]);
         } 
     }
    return callback(null, filteredArray);
    });
}  

module.exports = filterFiles;
