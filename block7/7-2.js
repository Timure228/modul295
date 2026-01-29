const express = require("express")
let session = require('express-session')

const app = express()
app.use(express.json())

app.use(session({
    secret: "secret",
    name : "your_token_value",
    resave: false,
    saveUninitialized: true
}));

app.post("/name", (req, res) => {
    let name = req.body
    if (!name) {
    
        res.status(401).send("No Name provided!")
    }
    req.session.name = name;
    res.end()
    
})

app.get("/name", (req, res) => {
    if (req.session.name) {
        res.send("Session name: " + req.session.name.name)
    } else res.send("No session name")
})

app.delete("/name", (req, res) => {
    if (req.session.name) {
        delete req.session.name
        res.send("Session name is deleted")   
    } else res.end()
})

app.listen(3000, () => {
    console.log("Started!")
})
