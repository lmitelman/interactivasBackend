/*
    Endpoint: api/forms
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getForms, createForm, deleteForm } = require('../controllers/forms.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/getForms',
    // [
    //     validateJWT
    // ],
    getForms
);

router.delete('/deleteForm/:id',
    [
        validateJWT
    ],
    deleteForm
);

router.post('/createForm',
    [
        validateJWT,
        check('name').not().isEmpty(),
        check('questionList').isArray(),
        check('sector').not().isEmpty(),
        validarCampos
    ],
    createForm
);

module.exports = router;