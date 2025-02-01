const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change this if you have a different MySQL user
    password: "123",  // Set your MySQL password
    database: "eventDB",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// Home Page - Display Events
app.get("/", (req, res) => {
    const sql = "SELECT * FROM events";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render("index", { events: results });
    });
});

// Create Event
app.post("/add", (req, res) => {
    const { title, date, location } = req.body;
    const sql = "INSERT INTO events (title, date, location) VALUES (?, ?, ?)";
    db.query(sql, [title, date, location], (err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// Update Event
app.post("/update/:id", (req, res) => {
    const { title, date, location } = req.body;
    const sql = "UPDATE events SET title=?, date=?, location=? WHERE id=?";
    db.query(sql, [title, date, location, req.params.id], (err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// Delete Event
app.get("/delete/:id", (req, res) => {
    const sql = "DELETE FROM events WHERE id=?";
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
