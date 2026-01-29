const express = require("express")

const app = express()
app.use(express.json())

app.get("/public", (req, res) => {
    res.send("Darova")
})

app.get("/private", (req, res) => {
    if (req.header("Authorization") === "Basic emxpOnpsaTEyMzQ=") {
        res.send("Authorized")
    } else {
        res.sendStatus(401).set("WWW-Authenticate", 'Basic realm="Restricted Area"')
    }

})

app.listen(3000, () => {
    console.log("Started!")
})
