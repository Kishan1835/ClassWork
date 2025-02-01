# Event Management System

This is a simple Event Management System built with Node.js, Express, and MySQL. It allows users to add, update, and delete events.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MySQL](https://www.mysql.com/) (version 5.7 or higher)

## Installation

1. **Clone the repository** (if you have it on a local machine) or download the project files.

2. **Install dependencies**:
   Run the following command to install the required Node.js packages:
   ```bash
   npm install
   ```

## Setting Up the Database

1. **Create a MySQL database**:
   Open your MySQL client and run the following command to create a new database:
   ```sql
   CREATE DATABASE eventDB;
   ```

2. **Create the events table**:
   Use the following SQL command to create the `events` table:
   ```sql
   USE eventDB;

   CREATE TABLE events (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       date DATE NOT NULL,
       location VARCHAR(255) NOT NULL
   );
   ```

## Running the Application

1. **Start the server**:
   In the project directory, run the following command:
   ```bash
   node server.js
   ```

2. **Access the application**:
   Open your web browser and go to `http://localhost:5000` to access the Event Management System.

## Usage

- **Add Event**: Fill in the form with the event title, date, and location, then click "Add Event".
- **Update Event**: Use the "Update" button next to an event to modify its details.
- **Delete Event**: Click the "Delete" link next to an event to remove it from the list.

## Troubleshooting

- Ensure that your MySQL server is running and that you have the correct credentials in `server.js`.
- If you encounter any issues, check the console for error messages.

## License

This project is open-source and available for use and modification.