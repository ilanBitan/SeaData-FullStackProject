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
