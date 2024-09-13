// This module deals with JWT token generation and validation

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(username , useremail, id){
    const token = jwt.sign({name:username,email:useremail,ID:id},JWT_SECRET,{expiresIn: "1d"});
    return token;
}

function validateToken(token){
    return jwt.verify(token,JWT_SECRET);
}

module.exports = {generateToken,validateToken}