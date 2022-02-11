const valdiarJWT = require('../middlewares/validar-jwt');
const validarRol = require('../middlewares/validar-rol');
const validarCampos = require('../middlewares/validar-campos');



module.exports={

  ...validarCampos,
  ...validarRol,
  ...valdiarJWT

}
