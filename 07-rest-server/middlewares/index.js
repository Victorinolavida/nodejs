const valdiarJWT = require('../middlewares/validar-jwt');
const validarRol = require('../middlewares/validar-rol');
const validarCampos = require('../middlewares/validar-campos');
const validarArchivo = require('../middlewares/validar-archivo');





module.exports={
  ...validarArchivo,
  ...validarCampos,
  ...validarRol,
  ...valdiarJWT,
}
