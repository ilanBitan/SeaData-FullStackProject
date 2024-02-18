Sure, here's the updated README.md file with the included SQL script:

---

# SeaData Project for FullStack position

## Overview

This project is a User Management System designed to manage user data stored in a MySQL database. It provides functionalities to add, edit, and delete user records through a user-friendly interface developed using React on the client side and Node.js on the server side.

## Features

1. **Database Setup**: Install MySQL Database and create a database named EXAM.
2. **User Table**: Create a USERS table with the following fields: 
   - id (auto increment, Primary Key)
   - full name
   - country
   - city
   - email
   - phone number
   - job title
   - years of experience

### SQL Script

```sql
-- Create the EXAM database
CREATE DATABASE IF NOT EXISTS EXAM;

-- Use the EXAM database
USE EXAM;

-- Create the USERS table
CREATE TABLE IF NOT EXISTS USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    job_title VARCHAR(255),
    years_of_experience INT
);

-- Insert JSON data into the USERS table
INSERT INTO USERS (full_name, country, city, email, phone_number, job_title, years_of_experience) VALUES
('Ilan Bitan', 'ישראל', 'Givat Shmuel', 'bitanilan@gmail.com', '052-123-3222', 'Full Stack Engineer', 0),
('Yonadav Leibowitz', 'Israel', 'Tel Aviv', 'yonadav@gmail.com', '123456789012', 'Full Stack Engineer', 12),
('Drake Bell', 'USA', 'California', 'DrakeBell@gmail.com', '987-648-3915413', 'Singer', 0);
```

## Installation

To run this project locally, follow these steps:

1. Clone the repository from GitHub: `git clone <[repository_url](https://github.com/ilanBitan/SeaData-FullStackProject.git)>`
2. Navigate to the project directory: `cd user-management-system`
3. Install dependencies for the server:
   ```bash
   cd server
   npm install
   ```
4. Configure MySQL Database:
   - Install MySQL and create a database named EXAM.
   - Create a USERS table with the specified fields.
5. Start the server:
   ```bash
   node server.js
   ```
6. Install dependencies for the client:
   ```bash
   cd src
   npm install
   ```
7. Start the client:
   ```bash
   npm start
   ```
8. Access the application in your browser at `http://localhost:3000`.
9. The server is running on port 3001.

## Usage

- **Add New User**: Click on the "Add User" button to open the form screen and fill in the required details to add a new user.
- **Edit User**: Click on the "Edit" button next to a user's record to edit their details.
- **Delete User**: Click on the "Delete" button next to a user's record to delete them from the database.
- **Filter Users**: Use the autocomplete filter above the data table to search for users by their full name.
- **Sort Records**: Click on the column title in the data table to sort the records based on that column.
- **Highlight Users**: Users with a job title of less than 1 year of experience will have their first name colored in orange.

## Folder Structure

- **server**: Contains the server-side code written in Node.js with Express.js to handle HTTP requests and interact with the MySQL database.
- **client**: Contains the client-side code written in React to create the user interface and communicate with the server.

![image](https://github.com/ilanBitan/SeaData-FullStackProject/assets/62257681/3609d330-eae9-4cc8-89e4-5d38965010b1)

## Credits

This project was developed by Ilan Bitan.
