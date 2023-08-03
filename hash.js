const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = process.argv[2];

console.log(`Plain text: ${plainText}`);

bcrypt.hash(plainText, saltRounds, (err, hash) => {
    // a callback function after hash() is done
    console.log(`Hash: ${hash}`);
});