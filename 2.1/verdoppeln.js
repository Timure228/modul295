function verdoppeln(zahl, callback) {
    callback(zahl*2) 

}
verdoppeln(5, (z) => {
    console.log(z);
})


verdoppeln(5, (a) => console.log(Math.sqrt(a)))
