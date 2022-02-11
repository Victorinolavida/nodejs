const { Router }=require('express');
const { check } = require('express-validator');
const { usuariosGET, 
        usuariosPUT,
        usuariosPOST,
         usuariosDELETE, 
         usuariosPATCH 
} = require('../controllers/usuarios.controller');
const {esRolValido,emailExiste,existeUsuarioId} = require('../helpers/db-validators');
const { validarjwt, tieneRol, validarCampos } = require('../middlewares')


const router=Router()

router.get('/',usuariosGET);

router.put('/:id',[
check('id', 'No es un id válido').isMongoId(),
check('id').custom( existeUsuarioId ),
check('rol').custom( esRolValido ), 
validarCampos
],usuariosPUT);


router.post('/',[
check('correo','El correo no es válido').isEmail(),
check('correo').custom( emailExiste ),
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El password es obligatorio y mayor a 6 caracteres').isLength({min:6}),
// check('rol','No es un rol válido' ).isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom( esRolValido ),
validarCampos
],usuariosPOST);

router.delete('/:id',[
validarjwt,
// validarRol,
tieneRol('ADMIN_ROL','VENTAS_ROL'),
check('id', 'No es un id válido').isMongoId(),
check('id').custom( existeUsuarioId ),
validarCampos
],usuariosDELETE);

router.patch('/',usuariosPATCH);




module.exports=router
