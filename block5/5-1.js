// Bibliothek APP
const express = require('express');
const session = require('express-session');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

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
        response.json(books)
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
app.get("/lends", (req, res) => {
    if (req.session.marker === "authentifiziert") {
        req.session.marker = "authentifiziert"
        res.send(ausleihe).end()
    }
    res.status(401).end()
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
        if (req.session.marker === "authentifiziert") {
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

            req.body.id = ausleihe.length + 1 
            req.body.borrowedAt = (new Date().toISOString())
            req.body.returnedAt = null

            ausleihe = [...ausleihe, req.body];

            req.session.marker = "authentifiziert"
            res.send(req.body).end();
        }
        res.status(401).end();
    })

app.delete("/lends/:idx", (req, res) => {
    const idx = parseInt(req.params.idx)
    let current_lend = ausleihe.find((a) => a.id === idx)
    let lendToUpdate = {...current_lend, "returnedAt": (new Date().toISOString()) };
    ausleihe = ausleihe.map(lend => lend.id === idx ? lendToUpdate : lend);
    res.send(lendToUpdate)
})

// PATH /lends/:id
app.patch("/lends/:id", (request, response) => {
	const lendIndex = ausleihe.findIndex(lend => lend.id == request.params.id)
	if(lendIndex < 0) return response.sendStatus(404)

	const updatedLend = { ...ausleihe[lendIndex], ...request.body }

	ausleihe.splice(lendIndex, 1, updatedLend)
	response.json(updatedLend)  
})

const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My Library',
    description: 'My Library Website'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./5-1.js'];

swaggerAutogen(outputFile, routes, doc)

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(outputFile);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/login", (req, res) => {
    res.sendFile("C:/Users/tymur.arduch/Desktop/Informatik/modul295/block5/login_formular.html")
})

app.post("/login", (req, res) => {
    if (req.query.email === "desk@library.example" && req.query.password === "m295") {
        req.session.marker = "authentifiziert"
        res.status(201).end()
    }
    res.status(401).end()
})

app.get("/verify", (req, res) => {
    if (req.session.marker) {
        res.status(200).end()
    }
    res.status(401).end()
})

app.delete("/logout", (req, res) => {
    req.session.destroy()
    res.end()
})  

app.listen(3000, () => {
    console.log("Library Started!")
})
