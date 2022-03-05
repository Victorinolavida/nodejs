const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDYNARY_URL )
const { request, response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const producto = require('../models/producto');
const usuario = require('../models/usuario');




const cargarArchivo = async( req, res=response ) => {


  try {
    //imagenes
    const nombre = await subirArchivo( req.files,undefined,'imgs' )  
  
    //textos
    // const nombre = await subirArchivo( req.files,['txt','md'],'textos' )  
    res.json({ nombre })
    
    
  } catch (msg) {
    res.status(400).json({ msg })
  }

}


const actualizarImagen = async( req=request, res=response ) => {

  const { id, coleccion } = req.params;


  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await usuario.findById( id )
      if( !modelo ){
        return res.status(400).json({
          msg: `El usuario con id: ${ id } no existe`
        });
      };
      break;

      case 'productos':
        modelo = await producto.findById( id )
        if( !modelo ){
          return res.status(400).json({
            msg: `El producto con id: ${ id } no existe`
          });
        };
        break;
  
    default:
      return res.status(500).json({ msg:'opcion no válida' })
  }
 
  //limpiar imagenes previas
  if ( modelo.img ){
    //borrar imagen del servidor
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);

    if( fs.existsSync( pathImagen ) ){
      fs.unlinkSync( pathImagen )
    }
  }

  const nombre = await subirArchivo( req.files, undefined, coleccion )  
  modelo.img = nombre

  await modelo.save()

  res.json({ modelo });

};

const actualizarImagenCloudinary = async( req=request, res=response ) => {

  const { id, coleccion } = req.params;


  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await usuario.findById( id )
      if( !modelo ){
        return res.status(400).json({
          msg: `El usuario con id: ${ id } no existe`
        });
      };
      break;

      case 'productos':
        modelo = await producto.findById( id )
        if( !modelo ){
          return res.status(400).json({
            msg: `El producto con id: ${ id } no existe`
          });
        };
        break;
  
    default:
      return res.status(500).json({ msg:'opcion no válida' })
  }
 
  //limpiar imagenes previas
  if ( modelo.img ){
    //borrar imagen del servidor 
    const linkArr=modelo.img.split('/');
    const [ public_id ] = linkArr[ linkArr.length - 1 ].split('.');

    await cloudinary.uploader.destroy( public_id )
  }

  const { tempFilePath } = req.files.archivo
  
  try {
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
    modelo.img = secure_url;
    await modelo.save();
    
    res.json( modelo );
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg:'algo salio mal, intente mas tarde'
      
    })
    
  }
};





const mostrarImagen = async( req, res=response ) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await usuario.findById( id )
      if( !modelo ){
        return res.status(400).json({
          msg: `El usuario con id: ${ id } no existe`
        });
      };
      break;

      case 'productos':
        modelo = await producto.findById( id )
        if( !modelo ){
          return res.status(400).json({
            msg: `El producto con id: ${ id } no existe`
          });
        };
        break;
  
    default:
      return res.status(500).json({ msg:'opcion no válida' })
  }
 
  //limpiar imagenes previas
  if ( modelo.img ){
    //borrar imagen del servidor
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);

    if( fs.existsSync( pathImagen ) ){
      return res.sendFile( pathImagen )
    }
  }

  // res.json({ msg:'falta place holder' });
  const noImage = path.join(__dirname, '../assets','no-image.jpg');

  console.log(noImage)

  res.sendFile( noImage )

}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary
}