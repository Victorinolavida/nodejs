const { response, request } = require('express')


const validarRol = ( req = request , res = response , next ) => {

  if( !req.usuarioAutentificado ){
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token"
    });
  };

  const { rol, nombre } = req.usuarioAutentificado;

  if (rol !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${nombre} no tiene permisos de usuarios`
    });
  };

  next();

}

const tieneRol = ( ...roles ) => {

  return ( req = request , res = response , next ) => {

    if( !req.usuarioAutentificado ){
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token"
      });
    };

    if ( !roles.includes( req.usuarioAutentificado.rol ) ){
      return res.status(401).json({
        msg: `El servicio requiere uno de los siguentes roles: ${ roles }`
      })
    }

    console.log(roles)
      next();
  };

};


module.exports = {
  validarRol,
  tieneRol
}