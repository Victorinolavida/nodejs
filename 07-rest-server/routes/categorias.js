const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria,
       obtenerCategorias,
       obtenerCategoria,
       actualizarCategoria,
        deleteCategoria 
      } = require("../controllers/categorias.controller");
const { existeCategoria } = require("../helpers/existeCategoria");
const { validarCampos, validarjwt, validarRol } = require("../middlewares");


const router = Router();

//obtener todas las categorias
router.get("/", obtenerCategorias);

//obtener una categoria por id
router.get("/:id",[
  check('id').isMongoId(), 
  check('id').custom( existeCategoria ),
  validarCampos
 ], obtenerCategoria );

 // crear categoria - privado -con cualquier token
 //TERMINADO :)
router.post("/",[
  validarjwt,
  check('nombre','el nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria );

//actualizar - privado con token valido
//TERMINADO :)
router.put("/:id",[
  validarjwt, 
  check('id').isMongoId(),
  check('nombre','el nombre es obligatorio').not().isEmpty(),
  check('id').custom( existeCategoria ),
  validarCampos
 ], actualizarCategoria);

//borrar una catergoria admin
router.delete("/:id",[
  validarjwt,
  validarRol, 
  check('id').isMongoId(),
  check('id').custom( existeCategoria ),
  validarCampos
 ], deleteCategoria);

module.exports = router;
