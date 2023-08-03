const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret_key = "fries";

const PORT = 8080;

const app = express();
app.use(bodyParser.json());

// mock data
let users = {};

// hello world route
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// @POST - /register - register a new user - PUBLIC
app.post('/register', (req, res) => {
    // get username and password
    const { username, password } = req.body;

    // check if username is already taken
    if (users[username]) {
        return res.status(400).json({ message: "Username already taken!" });
    }

    // salt and hash the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        // a callback function after hash() is done
        if (err) {
            return res.status(500).json({ message: "Error hashing password!" });
        }

        // store the username and hashed password
        users[username] = hash;

        // return success message
        return res.status(200).json({ message: "User registered!" });
    });
});

// @POST - /login - login a user - PUBLIC
app.post('/login', (req, res) => {
    // get username and password
    const { username, password } = req.body;

    // check if username exists
    if (!users[username]) {
        return res.status(400).json({ message: "Username does not exist!" });
    }

    // compare the password
    bcrypt.compare(password, users[username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error comparing passwords!" });
        }

        // if password is correct
        if (result) {
            // generate the token with the username
            const token = jwt.sign({ username }, secret_key, { expiresIn: '1h' });

            // return the token
            return res.status(200).json({ token });
        }

        // if password is incorrect
        return res.status(400).json({ message: "Incorrect password!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
