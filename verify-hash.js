const bcrypt = require('bcrypt');
const hashedValue = process.argv[2];
const plainText = process.argv[3];

bcrypt.compare(plainText, hashedValue, (err, result) => {
    console.log(`compare ${plainText} with ${hashedValue}: ${result}`);

    if (result) {
        console.log("Password matched!");
    } else {
        console.log("Password did not match!");
    }
});