const express = require('express')

let plz = 8400
let url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`

async function get_temperature() {
    try {
        const resp = await fetch(url)
        const json = await resp.json()
        return json.currentWeather.temperature
    } catch (error) {
        console.log(error)
    }
}


const app = express()
const port = 3000
app.get("/wetter", async (request, response) => {
    const temperature = await get_temperature();
    response.send("The temperature is: " + temperature)
    // request.get(url)
})

app.listen(port, () => {
     console.log(`Hello World app listening on port ${port}`)
})
