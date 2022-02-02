const { Router }=require('express');
const { usuariosGET, 
        usuariosPUT,
        usuariosPOST,
         usuariosDELETE, 
         usuariosPATCH 
} = require('../controllers/usuarios.controller');

const router=Router()

router.get('/',usuariosGET);

router.put('/:id',usuariosPUT);

router.post('/',usuariosPOST);

router.delete('/',usuariosDELETE);

router.patch('/',usuariosPATCH);





module.exports=router