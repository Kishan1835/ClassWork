const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentsDB", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});
const Student = mongoose.model("Student", studentSchema);

// Home Page (Displays Students)
app.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
});

// Create Student (Form Submission)
app.post("/add", async (req, res) => {
    const { name, age, email } = req.body;
    const newStudent = new Student({ name, age, email });
    await newStudent.save();
    res.redirect("/");
});

// Update Student (Form Submission)
app.post("/update/:id", async (req, res) => {
    const { name, age, email } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, age, email });
    res.redirect("/");
});

// Delete Student
app.get("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
