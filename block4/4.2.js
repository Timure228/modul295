const express = require('express')
const { request } = require('node:http')


const app = express()

app.use(express.urlencoded({ extended: true }));

app.get("/now", (request, response) => {
    let currentDate = new Date()
    let timezone_time = currentDate.toLocaleString("de-CH", {"timeZone": request.query.tz})
    response.send(timezone_time)
    console.log(request.query.tz)
})

let namen_liste = ["DD", "DJ Bob"];

app.post("/names", (req, res) => {
    const name = req.body.name
    namen_liste.push(name)
    res.json(namen_liste) // Updated array ausgeben
});

app.delete("/names", (req, res) => {
    const name = req.query.name;
    let index = namen_liste.indexOf(name)
    if (index !== -1) {
        namen_liste.splice(index, 1)
        res.json(namen_liste) // Updated array ausgeben
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
});

app.get("/secret2", (req, res) => {
    if (req.header("Authorization") == "aGFja2VyOjEyMzQ=") {
        res.sendStatus(200)
    } else {res.sendStatus(401)}
});

app.get("/chuck", (req, res) => {
    fetch("https://api.chucknorris.io/jokes/random").then(data => data.json()).then(resp => {
        res.send(JSON.stringify(resp.value).replace("Chuck Norris", req.query.name))
    })
});

let json_data = '{"FirstName": "Tymur", "LastName" : "Arduch", "Age": 20, "Address": "Hallostrasse 22", "EyesColor": "brown"}'
let json_ = JSON.parse(json_data)

app.patch("/me", (req, res) => { 
    res.send({ ...json_, ...req.body })
})

app.listen(3000, () => {
    console.log("Started!")
})
