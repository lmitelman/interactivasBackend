const { response } = require("express");

const getForms = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            method: 'getForms',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'getForms',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const createForm = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            method: 'createForms',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'createForms',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const deleteForm = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            method: 'deleteForm',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'deleteForm',
            msg: 'An unexpected error has occurred.'
        });
    }
}


module.exports = {
    getForms,
    deleteForm,
    createForm
}