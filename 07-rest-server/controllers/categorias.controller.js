const { response } = require('express');
const { categorias } = require('../models');

const obtenerCategorias = async(req, res=response) => {

  
  const { limite = 5, desde = 0  } = req.query;
  const query = {estado:true}
  
  console.log(limite,desde)

  
  const [ total,categoriasDB ] = await Promise.all([
    await categorias.countDocuments( query ),
    await categorias.find( query )
    .populate('usuario','nombre')
    .limit( +limite ).skip( +desde )

  ]);


  res.json({
    total,
    categorias:categoriasDB
  })


}

const obtenerCategoria = async( req, res=response) => {

  const { id } = req.params

  const categoria = await categorias.findById( id ).populate('usuario','nombre');

  return res.json({
    categoria
  })

}

const actualizarCategoria = async( req, res=response ) => {

  let { nombre } = req.body
  nombre = nombre.toUpperCase();

  const { id } = req.params

  const categoria = await categorias.findByIdAndUpdate( id , {
    nombre,
    usuario:req.usuarioAutentificado._id,
    },{new:true})

  return res.json(categoria)

}


const deleteCategoria = async( req,res=response ) => {

  const { id } = req.params;

  const user = req.usuarioAutentificado

  console.log(user)

  const categoria = await categorias.findByIdAndUpdate( id,{estado:false} );

  res.json( categoria )


  

}


const crearCategoria = async( req, res=response ) => {


  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await categorias.findOne({ nombre });

  // console.log(req)

  if( categoriaDB ){
    return res.status(400).json({
      msg:`La categoria ${ categoriaDB.nombre }, ya existe`
    })
  };

  //generar la data asi
  const data = {
    nombre,
    usuario: req.usuarioAutentificado._id
  }

  const categoria = new categorias( data )
  
  //guardar db

  await categoria.save();


  return res.status(201).json(categoria);

}




module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  deleteCategoria,
  actualizarCategoria,
  crearCategoria

}