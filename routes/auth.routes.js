/*
    Endpoint: api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { login} = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/login',
    [
        check('email').isEmail(),
        check('password').not().isEmpty(),
        validarCampos
    ],
    login
);


module.exports = router;