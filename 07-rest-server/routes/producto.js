const { Router } = require("express");
const { check } = require("express-validator");
const { crearProducto, obtenerProductos, obtenerProductorById, eliminarProductor, actualizarProducto } = require("../controllers/productor.controller");
const { existeProducto } = require("../helpers/db-validators");
const { existeCategoria } = require("../helpers/existeCategoria");
const { validarCampos, validarjwt, validarRol } = require("../middlewares");

const router = Router();

//mostrar productos
router.get('/', obtenerProductos);

//Mostrar producto por id
router.get('/:id',[
  check('id').isMongoId(),
  check('id').custom( existeProducto )
] ,obtenerProductorById);

//actualizar producto
router.put('/:id',[
  validarjwt,
  check('id').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
] ,actualizarProducto);
 
//crear producto
router.post('/',[
  validarjwt,
  check('categoria').isMongoId(),
  check('categoria').custom(existeCategoria),
  check('nombre','el nombre es obligatorio').notEmpty(),
  // check('precio','el precio debe ser un número').isNumeric(),
  validarCampos
] ,crearProducto );

// ELIMINAR PRODUCTO
router.delete('/:id',[
  validarjwt,
  validarRol,
  check('id').isMongoId(),
  validarCampos
] ,eliminarProductor);

module.exports = router;