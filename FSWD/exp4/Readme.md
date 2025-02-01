### File Descriptions

- **index.js**: The main server file that sets up the Express application, defines routes, and handles form submissions.
- **package.json**: Contains metadata about the project and lists the dependencies required to run the application.
- **views/**: Contains Handlebars templates for rendering the form and displaying submitted data.
  - **layouts/**: Contains layout files for Handlebars.
    - **main.handlebars**: The main layout file that wraps around other views.
  - **form.handlebars**: The form where users can input their name and email.
  - **display.handlebars**: The page that displays the submitted data.

## Dependencies

The project uses the following dependencies:

- **express**: A web framework for Node.js.
- **express-handlebars**: A templating engine for rendering views.
- **body-parser**: Middleware for parsing incoming request bodies.
- **fs**: Node.js file system module for reading and writing files.

## How It Works

1. **Form Submission**:

   - The user navigates to the root URL (`/`), where they see a form to submit their name and email.
   - Upon submission, the form data is sent as JSON to the `/submit` route using the Fetch API.

2. **Data Storage**:

   - The server receives the form data and writes it to a `data.json` file in the project directory.

3. **Display Data**:
   - After saving the data, the server redirects the user to the `/display` route, where the submitted data is read from the `data.json` file and rendered on the page.

## Code Snippets

### 1. `index.js`

```javascript
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
```

### 2. `views/layouts/main.handlebars`

```handlebars
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>
  <body>
    {{{body}}}
    <!-- This is where the content of the views will be injected -->
  </body>
</html>
```

### 3. `views/form.handlebars`

```handlebars
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form</title>
  </head>
  <body>
    <h1>Submit Your Data</h1>
    <form id="dataForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <br />
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <br />
      <button type="submit">Submit</button>
    </form>

    <script>
      document.getElementById('dataForm').addEventListener('submit', function
      (event) { event.preventDefault(); // Prevent the default form submission
      const formData = { name: document.getElementById('name').value, email:
      document.getElementById('email').value }; fetch('/submit', { method:
      'POST', headers: { 'Content-Type': 'application/json' }, body:
      JSON.stringify(formData) }) .then(response => { if (response.redirected) {
      window.location.href = response.url; // Redirect to the display page } });
      });
    </script>
  </body>
</html>
```

### 4. `views/display.handlebars`

```handlebars
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Display Data</title>
  </head>
  <body>
    <h1>Submitted Data</h1>
    <p>Name: {{data.name}}</p>
    <p>Email: {{data.email}}</p>
    <a href="/">Go Back</a>
  </body>
</html>
```

## Conclusion

This project serves as a basic example of how to use Express and Handlebars to create a web application that handles form submissions and displays data. You can expand upon this foundation by adding more features, such as validation, error handling, and styling.
