const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo,
         mostrarImagen, 
         actualizarImagenCloudinary 
}= require("../controllers/uploads.controller");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos,validarArchivo } = require("../middlewares");

const router = Router();

router.post('/', validarArchivo ,cargarArchivo )

router.put('/:coleccion/:id',[
  validarArchivo,
  check('id').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] )),
  validarCampos
], actualizarImagenCloudinary)
// actualizarImagen )


router.get('/:coleccion/:id',[
  validarArchivo,
  check('id').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] )),
  validarCampos
],mostrarImagen )

module.exports = router;