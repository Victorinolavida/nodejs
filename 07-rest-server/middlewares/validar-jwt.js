const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const usuario = require('../models/usuario');


const validarjwt = async(req = request, res = response, next) => {

  const token = req.header('x-token');

  if( !token ){
    return res.status(401).json({
      msg: "No hay token en la petición"
    });
  }

  try {
    
    const { uid } = jwt.verify( token, process.env.SECRETKEY );

    const usuarioAutentificado = await usuario.findById( uid )
    
    if( !usuarioAutentificado ){
      return res.status(401).json({
      msg: "No hay token en la petición-user_no-bd"
      });
    }

    req.usuarioAutentificado = usuarioAutentificado;

    //VER SI EL USUARIO NO ESTA ELIMINADO

    if( !usuarioAutentificado.estado ){
      return res.status(401).json({
      msg: "No hay token en la petición-user-eli"
      });
    }

    next();
    
  } catch (error) {

    console.log(error);

    return res.status(401).json({
      msg: "Token no valido"
    })
  }

};


module.exports = {
  validarjwt
}
