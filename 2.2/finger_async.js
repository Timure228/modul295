function simuliereVerzoegerung(ms) {
    return new Promise((resolve, reject) => {
        if (ms < 0){
            reject("duration must be positive!")
            return
        }
        setTimeout(resolve, ms)
        
    })
}

async function addiereNachVerzoegerung(a, b, ms) {
    try {
        await simuliereVerzoegerung(ms)
        console.log(a + b)  
    } catch (err) {
        console.log("An error has occured:", err)
    } finally {
        console.log("Always executed, in case of success or error")
    }
}

addiereNachVerzoegerung(1, 1, 2000)
