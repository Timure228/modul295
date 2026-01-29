const fs = require('node:fs')

function verdoppeln(zahl) {
    return new Promise((resolve, reject) => {
        if (zahl === 0) {
            reject('Reject')
        }
        resolve(zahl*2)
    })
}

verdoppeln(0)
    .then(k => {console.log("Die vedoppelte zahl ist " + k)})
    .catch(err => {console.log(err)})