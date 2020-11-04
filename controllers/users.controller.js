const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');

const getUsers = async (req, res = response) => {
    try {
        const users = await User.find();
        res.json({
            ok: true,
            method: 'getUsers',
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'getUsers',
            msg: 'An unexpected error has occurred.'
        });
    }
}

 /**
  * Sirve para obtener el rol del usuario
  * @param {email} req 
  * @param {user} res 
  */

 const getMe = async (req, res) => {
    const { email } = req.body;
    try {
        const isEmailRegistered = await User.findOne({ email });
        if (isEmailRegistered) {
            res.status(200).json({
                ok: true,
                method: 'getMe',
                user: isEmailRegistered
            });
        } else {
            res.status(404).json({
                ok: false,
                method: 'getMe',
                msg: 'Not found'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'createUser',
            msg: 'An unexpected error has occurred.'
        });
    }
 }

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const isEmailRegistered = await User.findOne({ email });
        if (isEmailRegistered) {
            res.status(400).json({
                ok: false,
                method: 'createUser',
                msg: `Email ${email} is already registered.`
            });
        } else {
            const user = new User(req.body);
            // --- Encrypt password ---
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);
            // ------------------------
            await user.save();
            res.json({
                ok: true,
                method: 'createUser',
                user: user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'createUser',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const updateUser = async (req, res = response) => {
    const _id = req.params.id;
    const { name, role } = req.body;
    try {
        const isExistingUser = await User.findById(_id);
        if (!isExistingUser) {
            return res.status(404).json({
                ok: false,
                method: 'updateUser',
                msg: `User with id ${_id} does not exist.`
            });
        } else {
            const updatedUser = await User.findByIdAndUpdate(_id, {
                name: name,
                role: role
            }, { new: true })
            res.json({
                ok: true,
                method: 'updateUser',
                updatedUser: updatedUser
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'updateUser',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const deleteUser = async (req, res = response) => {
    const _id = req.params.id;
    try {
        const isExistingUser = await User.findById(_id);
        if (!isExistingUser) {
            return res.status(404).json({
                ok: false,
                method: 'deleteUser',
                msg: `User with id ${_id} does not exist.`
            });
        } else {
            await User.findByIdAndDelete(_id);
            res.json({
                ok: true,
                method: 'deleteUser',
                deleted_id: _id
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'deleteUser',
            msg: 'An unexpected error has occurred.'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getMe,
}