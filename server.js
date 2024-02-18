const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '159623',
    database: 'exam'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const userData = req.body;

    const query = 'INSERT INTO users SET ?';

    connection.query(query, userData, (error, results) => {
        if (error) {
            console.error('Error adding user: ' + error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'User added successfully' });
    });
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const query = 'UPDATE users SET ? WHERE id = ?';

    connection.query(query, [updatedUserData, userId], (error, results) => {
        if (error) {
            console.error('Error updating user: ' + error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'DELETE FROM users WHERE id = ?';

    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Error deleting user: ' + error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
