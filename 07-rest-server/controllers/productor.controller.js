const { response } = require("express");
const { json } = require("express/lib/response");
const producto = require("../models/producto");

const obtenerProductos = async( req,res=response ) =>{
  const { limite = 5, desde = 0  } = req.query;
  const query = {estado:true}
  
  const [ total,productosDB ] = await Promise.all([
    await producto.countDocuments( query ),
    await producto.find( query )
    .populate('categoria','nombre')
    .populate('usuario','nombre')
    .limit( +limite ).skip( +desde )
  ]);

  res.json({
    total,
    productos:productosDB
  })


}

const obtenerProductorById = async( req,res=response) =>{

  const { id } = req.params;

  const productoDB = await producto.findById( id )
                      .populate('usuario','nombre')
                      .populate('categoria','nombre');

  res.json(productoDB);


};

const actualizarProducto = async (req,res=response) => {

  const { id } = req.params;

  const { usuario,estado,categoria,nombre,precio,descripcion }= req.body;
  const data = {
    nombre,
    precio,
    descripcion
  }

  const newProduct = await producto.findByIdAndUpdate( id, data, {'new':true} )

  res.json( newProduct )

}

const crearProducto = async( req, res=response ) => {

  const { estado,usuario , ...data } = req.body;
  const nombre = data.nombre.toUpperCase()

  const productoDB = await producto.findOne({nombre});

  if ( productoDB ){
    return res.status(400).json({
      msg:'El nombre ya existe'
    })
  }

  const usuario_id = req.usuarioAutentificado._id;

  const newProduct = new producto( {
    ...data,
    nombre,
    usuario:usuario_id
  })

  await newProduct.save()

  res.json( newProduct )

};

const eliminarProductor = async( req,res=response ) => {
  const { id } = req.params;

  const productDB = await producto.findByIdAndUpdate( id ,{estado:false} );

  res.json( productDB )

}


module.exports = {
  obtenerProductos,
  obtenerProductorById,
  eliminarProductor,
  crearProducto,
  actualizarProducto
}