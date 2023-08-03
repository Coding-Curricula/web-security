const jwt = require('jsonwebtoken');
const secret = "hamburger";
const token = process.argv[2];

// decrypt the given token
jwt.verify(token, secret, (err, decoded) => {
    if (err) {
        console.log("Invalid token!");
    } else {
        console.log(decoded);
    }
});
