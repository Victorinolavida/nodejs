const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarToken } = require('../helpers/generarJWT');
const usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-validator');
const { json } = require('express/lib/response');


const login = async( req,res=response ) => {

  const { correo, password } = req.body;

  try {
  
    // Verificar si el correo existe
    const user = await usuario.findOne({correo});

    if( !user ){
      return res.status(400).json({
        msg:"Usuario / Password no son correctos - correo"
      })

    }

    //si el usuario esta activo en DB

    if( !user.estado ){
      return res.status(400).json({
        msg:"Usuario / Password no son correctos - estado"
      })
    }

    //verificar si la contraseña es correta
    const validPassword = bcryptjs.compareSync( password, user.password )

    if( !validPassword ){
      return res.status(400).json({
        msg:"Usuario / Password no son correctos - pass"
      })
    }
    
    //generar JWT
    const token = await generarToken( user.id ) 


    res.json({
      user,
      token
    })

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      msg:"hable con el administrador"
    })
    
  }

  

}


const googleSignIn = async( req, res=response ) => {

  const { id_token } = req.body;

  try {
    
    const {nombre, correo, img} = await googleVerify( id_token );
    
    let user = await usuario.findOne( { correo } );
    
    //comprueba si no existe un usuario con el correo
    
    if ( !user ){
      
      console.log(nombre,correo,img);

      const data = {
        nombre,
        correo,
        password:':p',
        img,
        google:true,
        rol:'USER_ROLE'    
      }
      
      user = new usuario( data )
      await user.save()
    
    }
    

    //Verificar si el usuario esta en DB pero esta "borrado" 

    if( !user.estado ){
      return res.status(401).json({
        msg:"Usuario bloqueado, hable con el administrador"
      })
    }

    //generar JWT
    const token = await generarToken( user.id ) 
    
    res.json({
      msg:'ok',
      user,
      token
    });

  } catch (error) {
    
    console.log(error)

    res.status(400).json({
      ok:'false',
      msg:'El token no pudo ser verificado'
    })
  };

};


module.exports = {
  login,
  googleSignIn
}