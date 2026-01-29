let isbns = [];
try {
    let response = await fetch("http://localhost:3000/books")
    .then(data => data.json()).then(resp => resp.forEach((e) => isbns.push(e["isbn"])));
} catch (err) {
    console.error(err);
}
