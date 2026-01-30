// TODO APP
const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [
    {
        id: 1, title: "Make Homework", description: "Math Homework", done: false, 
        createdAt: new Date().toISOString(), dueDate: new Date(2026, 1, 30, 11, 30).toISOString(), completedAt: null
    },
    {
        id: 2, title: "Clean the House", description: "Mom asked to", done: false, 
        createdAt: new Date().toISOString(), dueDate: new Date(2026, 2, 2, 17).toISOString(), completedAt: null
    },
    {
        id: 3, title: "Visit grandma", description: "Didn't visit her for a while", done: false, 
        createdAt: new Date().toISOString(), dueDate: new Date(2026, 2, 12, 13, 25).toISOString(), completedAt: null
    },
    {
        id: 4, title: "Send Email", description: "Boss needs it", done: false, 
        createdAt: new Date().toISOString(), dueDate: new Date(2026, 2, 13, 14, 55).toISOString(), completedAt: null
    }
]

const nextId = () => Math.max(...tasks.map((task) => task.id))+1;

function isValid(json) {return json.title === "" ? false : true;}

app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true
}));

// Authorization
app.post("/login", (req, res) => {
    if (req.header("Authorization") === "Basic YWRtaW46MTIzMTIz") {
        req.session.aut_marker = "authorized"
        res.end()
    }
})

app.get("/verify", (req, res) => {
    if (!req.session.aut_marker) {
        res.status(401).end()
    }
    res.status(200).end()
}) 

app.delete("/logout", (req, res) => {
    delete req.session.aut_marker
    res.end()
})

// CRUD
app.get("/tasks", (req, res) => {
    if (req.session.aut_marker) {
        return res.send(tasks)
    } res.status(401).end()
})

app.get("/tasks/:id", (req, res) => {
    let found_task = tasks.find((task) => task.id === parseInt(req.params.id))
    if (req.session.aut_marker && found_task) {
        return res.send(found_task)
    }
    else if (!req.session.aut_marker) {
        res.status(401).end()
    } else { res.status(404).end() }
})  

app.post("/tasks", (req, res) => {
    if (req.session.aut_marker && isValid(req.body)) {
        req.body.id = nextId()
        if (!req.body.createdAt) {
            req.body.createdAt = new Date().toISOString()
        }
        else if (req.body.done === true) {
            req.body.completedAt = new Date().toISOString()
        }
        req.body.dueDate = (new Date(2026, 1, 30, 11, 30).toISOString())
        tasks.push(req.body)
        res.status(201).send(req.body)
    } 
    else if (!isValid(req.body)) {
        res.status(422).end()
    }
    res.status(401).end()
})

app.put("/tasks/:id", (req, res) => {
    if (req.session.aut_marker) {
        let id = parseInt(req.params.id)
        req.body.id = id
        tasks = tasks.map((task) => task.id === id ? req.body : task)
        return
    } res.status(401).end()
})

app.delete("/tasks/:id", (req, res) => {
    if (req.session.aut_marker) {
        tasks = tasks.filter((task) => task.id != parseInt(req.params.id))
        return res.send(req.params)
    } res.status(401).end()
})

// Swagger
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'TODO APP',
    description: 'TODO APP Website'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output_projekt.json';
const routes = ['./mein_projekt.js'];

swaggerAutogen(outputFile, routes, doc);

const swaggerDocument = require(outputFile);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// APP listen
let port = 3000
app.listen(port, console.log(`TODO APP started at port ${port}`))
