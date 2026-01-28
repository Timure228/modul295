// Callbacks (are used to handle async operations)
function hello(callback) {
    console.log("Hello")
    callback()
}

function goodbye() {
    console.log("Goodbye")
}

hello(goodbye)
