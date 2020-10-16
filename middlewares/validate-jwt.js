const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            mag: 'Unauthorized. Missing token header.' 
        });
    } else {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                ok: false,
                mag: 'Unauthorized. Invalid token.' 
            });
        }
    } 
}

module.exports = {
    validateJWT
}