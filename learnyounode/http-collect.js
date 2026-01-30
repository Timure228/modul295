const http = require('http');

const arr = []

http.get(process.argv[2], (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type']
    res.setEncoding("utf8")
    res.on('data', (data) => {
        arr.push(data)
    })
    res.on("end", _ => {
        console.log(arr.join(""))
    })
})
