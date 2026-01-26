let i = 2
let end_sum = 0;
while(process.argv[i]) {
    end_sum += Number(process.argv[i])
    i++
}
console.log(end_sum)

