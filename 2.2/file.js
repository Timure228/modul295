const fs = require("fs")

function leseDateiInhalt(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

leseDateiInhalt('kost.txt')
    .then(inhalt => {
        console.log('Die länge', inhalt.length)
    })
    .catch(err => err)
