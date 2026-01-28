const express = require('express')


const app = express()
let currentDate = new Date(); 

app.get("/now", async (request, response) => {
    response.send(currentDate.getHours() + ":" + currentDate.getMinutes())
}) 

app.get("/zli", async (request, response) => {
    response.redirect("https://www.zli.ch/")
}) 

fetch("https://api.api-ninjas.com/v2/randomuser?count=1", 
    {headers: {'x-api-key': 'B46jvQKdWltUpxs3YdNS62FHI1sFesRTVZA4kmVo'}})
    .then((data) => data.json())
    .then((resp) => {
    app.get("/name", (request, response) => {
        response.send(resp[0]["username"])
    })
})

app.get("/html", (request, response) => {
    response.sendFile("C:/Users/tymur.arduch/Desktop/Informatik/modul295/block3/hello.html")
})

app.get("/image", (request, response) => {
    response.sendFile("C:/Users/tymur.arduch/Desktop/Informatik/modul295/block3/python_logo.png")
})

app.get("/teapot", (request, response) => {
    response.sendStatus(418)
})

app.get("/user-agent", (request, response) => {
    response.send(request.get('User-Agent'))
})

app.get("/secret", (request, response) => {
    response.sendStatus(403)
})

app.get("/xml", (request, response) => {
    response.sendFile("C:/Users/tymur.arduch/Desktop/Informatik/modul295/block3/test.xml")
})

let json_data = '{"FirstName": "Tymur", "LastName" : "Arduch", "Age": 20, "Address": "Hallostrasse 22", "EyesColor": "brown"}'

app.get("/me", (request, response) => {
    response.send(JSON.parse(json_data))
})

app.listen(3000, () => {
    console.log("Started!")
})
