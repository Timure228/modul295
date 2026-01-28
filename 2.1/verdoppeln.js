function verdoppeln(zahl, callback) {
    callback(zahl*2) 

}
verdoppeln(5, () => {
    console.log("n");
})


verdoppeln(5, (a) => console.log(Math.sqrt(a)))
