const jwt = require("jsonwebtoken");

require('dotenv').config(); //import and configure dotenv package to get SECET_KEY

const createNewToken = (payload) => {
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '10d' }); //replacle process.getuid with process.env
}

module.exports = createNewToken; //export function createNewToken