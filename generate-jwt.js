const jwt = require('jsonwebtoken');
const secret = "hamburger";

// data to be used for generating the token
const mockLoginData = {
    accountId: 123,
    email: "myemail@email.com",
    permissions: { role: "ADMIN" }
};

// generate the token with the above data
const token = jwt.sign(mockLoginData, secret, { expiresIn: '1h' });
console.log(`Token: ${token}`);