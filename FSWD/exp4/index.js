const express = require("express");
const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars").engine;
const app = express();
const PORT = 3000;

// Set up Handlebars as the view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static("public"));

// Route to display the form
app.get("/", (req, res) => {
  res.render("form");
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  const formData = req.body;

  // Save form data to a JSON file
  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(formData, null, 2)
  );

  // Redirect to the display page
  res.redirect("/display");
});

// Route to display the stored data
app.get("/display", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), "utf-8")
  );
  res.render("display", { data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
