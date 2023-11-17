const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_cinema"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM movies";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get('/update/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        if (data.length === 0) return res.json("User not found"); 
        return res.json(data[0]); 
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE users SET `name` = ? ,`email` = ?, `password`= ? WHERE id =?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/user/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id =?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get('/screenings/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const sql = 'SELECT * FROM screenings WHERE movie = ?';

    db.query(sql, [movieId], (err, data) => {
        if (err) {
            console.error('Error fetching screenings:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (data.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Assuming you want to return user data upon successful login
        const user = data[0];
        return res.json(user);
    });
});

app.listen(8081, () => {
    console.log("listening");
});