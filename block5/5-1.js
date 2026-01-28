const express = require('express')
const { request } = require('node:http')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let books = [
  { isbn: 1, title: "Der Verdacht", year: 2017, author: "Friedrich Dürrenmatt" },
  { isbn: 2, title: "The Art of Human Nature", year: 2015, author: "Robert Greene" },
  { isbn: 3, title: "1984", year: 1949, author: "George Orwell" },
  { isbn: 4, title: "Weisse Nächte", year: 1848, author: "Fjodor Dostojewski" },
  { isbn: 5, title: "Metro 2033", year: 2005, author: "Dmitry Glukhovsky" },
  { isbn: 6, title: "The Art of Peace", year: 1984, author: "Morihei Ueshiba" },
  { isbn: 7, title: "Harry Potter", year: 1997, author: "J.K. Rowling" },
  { isbn: 8, title: "Idiot", year: 1869, author: "Fjodor Dostojewski" },
  { isbn: 9, title: "Der Terror", year: 2006, author: "Dan Simmons" },
  { isbn: 10, title: "Die Sonne im Gesicht", year: 2011, author: "Sibylle Berg" }
]

let ausleihe = [

]

app.get("/books", (request, response) => 
    {
        response.send(books)
    })

app.get("/books/:idx", (req, res) => 
    {
        let idx = parseInt(req.params.idx)
        res.send(books.find(book => book.isbn === idx));
    })

app.post("/books", (req, res) => 
    {
        books = [...books, req.body];
        res.send(req.body);
    })

app.put("/books/:idx", (req, res) => // overwrite the book object
    {
        let idx = parseInt(req.params.idx)
        books = books.map(book => book.isbn === idx ? req.body : book);

        res.send(books.find(book => book.isbn === idx))
    })

app.delete("/books/:idx", (req, res) => 
    {
        let idx = parseInt(req.params.idx)
        books = books.filter((book) => book.isbn != idx)

        res.redirect("/books")
    })

app.patch("/books/:idx", (req, res) => // take existing book and change it
    {
        let idx = parseInt(req.params.idx)
        let existingBook = books.find(book => book.isbn === idx);
        let bookToUpdate = {...existingBook, ...req.body};
        books = books.map(book => book.isbn === idx ? bookToUpdate : book);

        res.send(books.find(book => book.isbn === idx))

    })

// Ausleihen
app.get("/lends", (req, res) => 
    {
        res.send(ausleihe)
    })

app.get("/lends/:idx", (req, res) => 
    {
        let idx = parseInt(req.params.idx)
        if (ausleihe.length === 0) {
            return
        }
        res.send(ausleihe.find(ausleihe => ausleihe.id === idx));
    })


app.post("/lends", (req, res) => 
    {
        if (!req.body.customerId && !req.body.isbn) {
            res.sendStatus(422)
            return
        }
        else if (req.body.id === null && req.body.customerId === null && req.body.isbn === null && req.body.borrowedAt === null) {
            console.log("id, customerId, isbn, borrowedAt dürfen nicht null sein!")
            return
        } 
        else if (req.body.returnedAt === null && req.body.borrowedAt === null) {
            console.log("returnedAt darf nicht null sein, solange die Ausleihe noch nicht offen ist!")
            return
        }
        else if (ausleihe.find((ausleihe) => ausleihe.returnedAt === null && ausleihe.isbn === req.body.isbn)) {
            console.log(`Das Buch mit ISBN ${req.body.isbn} ist bereits ausgeliehen worden`)
            res.sendStatus(422)
            return
        }
        else if (ausleihe.filter((ausleihe) => ausleihe.customerId === req.body.customerId).length === 3) {
            console.log("Du hast schon 3 Bücher ausgeliehen! Es reicht dir schon...")
            res.sendStatus(422)
            return
        }

        let date = new Date()
        req.body.id = ausleihe.length + 1 
        req.body.borrowedAt = date.getDate()
        req.body.returnedAt = null
        
        ausleihe = [...ausleihe, req.body];
        res.send(req.body);
    })

app.delete("/lends/:idx", (req, res) => {
    const idx = parseInt(req.params.idx)
    ausleihe = ausleihe.filter((as) => as.id != idx)
    res.send(ausleihe)
})

app.listen(3000, () => {
    console.log("Library Started!")
})

