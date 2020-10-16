const { response } = require("express");
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt.js");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const ExistingUser = await User.findOne({ email: email });
        if (!ExistingUser) {
            return res.status(404).json({
                ok: false,
                method: 'login',
                msg: `User with email ${email} does not exist.`
            });
        } else {
            const validPassword = bcrypt.compareSync(password, ExistingUser.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    method: 'login',
                    msg: `Incorrect password.`
                });
            } else {
                // Correct data, generating Json Web Token
                const token = await generateJWT(ExistingUser._id, ExistingUser.email);
                res.json({
                    ok: true,
                    method: 'login',
                    user: ExistingUser,
                    token: token
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'login',
            msg: 'An unexpected error has occurred.'
        });
    }
}

module.exports = {
    login,
}