/*
    Endpoint: api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/getUsers',
    [
        validateJWT
    ],
    getUsers
);

router.delete('/deleteUser/:id',
    [
        validateJWT
    ],
    deleteUser
);

router.post('/createUser',
    [
        validateJWT,
        check('name').not().isEmpty(),
        check('password').not().isEmpty(),
        check('role').not().isEmpty(),
        check('email').isEmail(),
        validarCampos
    ],
    createUser
);

router.put('/updateUser/:id',
    [
        validateJWT,
        check('name').not().isEmpty(),
        check('role').not().isEmpty(),
        validarCampos
    ],
    updateUser
);


module.exports = router;