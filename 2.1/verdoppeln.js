function verdoppeln(zahl, callback) {
    callback(zahl*2) 

}
verdoppeln(5, (result) => {
    console.log(result);
})


verdoppeln(5, (a) => console.log(Math.sqrt(a)))
