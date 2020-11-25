const { response } = require("express");
const Form = require('../models/form.model.js');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})


const getForms = async (req, res = response) => {
    try {
        const forms = await Form.find();
        res.json({
            ok: true,
            method: 'getForms',
            forms: forms
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

const getPublishedForms = async (req, res = response) => {
    try {
        const forms = await Form.find({ status: "published" });
        res.json({
            ok: true,
            method: 'getForms',
            forms: forms
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
    console.log(req.body);
    req.body.status = "hidden";
    const form = new Form(req.body);
    try {
        await form.save(req.body);
        res.json({
            ok: true,
            method: 'createForms',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'createForms',
            msg: 'An unexpected error has occurred.',
            error_message: error.message
        });
    }
}

const deleteForm = async (req, res = response) => {
    const _id = req.params.id;
    try {
        const isExistingForm = await Form.findById(_id);
        if (!isExistingForm) {
            return res.status(404).json({
                ok: false,
                method: 'deleteForm',
                msg: `Form with id ${_id} does not exist.`
            });
        } else {
            await Form.findByIdAndDelete(_id);
            res.json({
                ok: true,
                method: 'deleteForm',
                deleted_id: _id
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'deleteForm',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const getForm = async (req, res = response) => {
    const _id = req.params.id;
    try {
        const isExistingForm = await Form.findById(_id);
        if (!isExistingForm) {
            return res.status(404).json({
                ok: false,
                method: 'getForm',
                msg: `Form with id ${_id} does not exist.`
            });
        } else {
            res.json({
                ok: true,
                method: 'getForm',
                form: isExistingForm
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'getForm',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const switchFormStatus = async (req, res = response) => {
    const _id = req.params.id;
    try {
        const isExistingForm = await Form.findById(_id);
        if (!isExistingForm) {
            return res.status(404).json({
                ok: false,
                method: 'switchFormStatus',
                msg: `Form with id ${_id} does not exist.`
            });
        } else {
            if (isExistingForm.status == "hidden") {
                const updatedForm = await Form.findByIdAndUpdate(_id, {
                    status: "published",
                }, { new: true })
                res.json({
                    ok: true,
                    method: 'switchFormStatus',
                    msg: `Form with id ${_id} switched to published.`,
                    updatedForm: updatedForm
                });
            } else if (isExistingForm.status == "published") {
                const updatedForm = await Form.findByIdAndUpdate(_id, {
                    status: "hidden",
                }, { new: true })
                res.json({
                    ok: true,
                    method: 'switchFormStatus',
                    msg: `Form with id ${_id} switched to hidden.`,
                    updatedForm: updatedForm
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'switchFormStatus',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const sendEmail = async (req, res = response) => {
    const { email, formName, results } = req.body;
    var str = '<ul>'
    results.forEach(function (result) {
        str += '<li>' + `<b>Pregunta:</b> ${result.question} <br> <b>Respuesta:</b> ${result.result}` + '</li>';
    });
    str += '</ul>';
    try {
        await transporter.sendMail({
            to: email,
            from: 'observatorio.pyme2020@gmail.com',
            subject: 'FUNDACIÓN OBSERVATORIO PYME',
            html: `
            <b>Muchas gracias por responder a nuestro formulario ${formName}</b>
            <br>
            ${str}
            <p>Podrás encontrar mas formularios de encuestas en <b>https://api-frontend.vercel.app/benchmarking</b></p>
            `
        });
        return res.status(200).json({
            ok: true,
            method: 'sendEmail',
            msg: "Email sent!"
        })
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = {
    getForms,
    deleteForm,
    createForm,
    getForm,
    switchFormStatus,
    getPublishedForms,
    sendEmail
}