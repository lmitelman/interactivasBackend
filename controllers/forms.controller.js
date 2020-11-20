const { response } = require("express");
const Form = require('../models/form.model.js');
const nodemailer = require("nodemailer");


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
    req.body.status = "published";
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
    const { email } = req.body;
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "nathen.schneider37@ethereal.email", // generated ethereal user
                pass: "8CUgbZahKtYQnCZnEy", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error);
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