const {response}=require('express');
const Usuario = require('../models/usuario');
const bcryptjs=require('bcryptjs');
const usuario = require('../models/usuario');

const usuariosGET= async(req,res=response) => {
  
  // const { q , nombre='No name' , apellido }=req.query; 
  const { limite = 5, desde = 0  } = req.query;
  const query = {estado:true}

  if( isNaN( limite ) || isNaN( desde ) ){
    const parametro = (isNaN( limite ))?'limite':'desde';
    return res.status(400).json({
      Error:{
        msg:`los parametro ${ parametro.toUpperCase() } debe ser un número`
      }
    })
  }

  const [ total, usuarios ] = await Promise.all([
    usuario.countDocuments(query),
    usuario.find(query)
    .limit( +limite)
    .skip( Number( desde ) )
  ])
  
  res.json({total,usuarios});

}

const usuariosPOST = async(req,res) => {

  const { nombre,correo,password,rol } = req.body;

  const usuario = new Usuario( { nombre,correo,password,rol } );

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password=bcryptjs.hashSync( password,salt )


  //guardar en BD
  usuario.save()


  res.status(201).json({
    msg:"API-post controller",
    usuario,
  });
};

const usuariosPUT = async(req,res) => {

  //id esta en la ruta
  const { id } = req.params;
  const { __id, password, google, correo, ...rest } = req.body;

  //valir contra base de datos 
  if( password ){
    //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  rest.password=bcryptjs.hashSync( password,salt )

  }

  const usuario = await Usuario.findByIdAndUpdate( id, rest )

  res.json( usuario );


}

const usuariosDELETE = async(req,res) => {

  const {id} = req.params;

  const userAuth = req.usuarioAutentificado;
  //borrado fisico 

  // const user = await usuario.findByIdAndDelete( id );

  const user = await usuario.findByIdAndUpdate( id, {estado:false} );


  res.json({user,userAuth});

  
}

const usuariosPATCH=(req,res) => {
  res.json({
    msg:"API-patch controller"
  });
};


module.exports={
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
  usuariosPATCH,
  
}