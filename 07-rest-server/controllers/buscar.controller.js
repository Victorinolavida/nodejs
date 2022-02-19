const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { usuario, categorias,producto } = require('../models');


const coleccionesPermitidas = [
  'productos',
  'categorias',
  'roles',
  'usuarios'
];

const buscarUsuarios = async( termino='', res=response ) => {

  const esMongoId = ObjectId.isValid( termino );

  if( esMongoId ){
    const user = await usuario.findById( termino )
    return res.json({
      results:(user?[user]:[])
    });
  }

  const regexp = new RegExp( termino, 'i' );



   const [ total, usuarios ] = await Promise.all([
     usuario.count({ 
      $or: [{ nombre:regexp },{ correo:regexp } ],
      $and: [{ estado:true }]
     }),
     usuario.find({ 
      $or: [{ nombre:regexp },{ correo:regexp } ],
      $and: [{ estado:true }]
     })
   ]);

  res.json({
    total,
    results: usuarios 
  })
};

const buscarCategorias = async( termino='',res=response ) => {
  
  const esMongoId = ObjectId.isValid( termino );

  if( esMongoId ){
    const categoria = await categorias.findById( termino );
    return res.json({
      results:(categoria?[categoria]:[])
    });
  };

  const regexp = new RegExp( termino, 'i' );

  console.log(regexp)

   const [ total, categoria ] = await Promise.all([
     categorias.count({ 
      $or: [{ nombre:regexp } ],
      $and: [{ estado:true }]
     }),
     categorias.find({ 
      $or: [{ nombre:regexp } ],
      $and: [{ estado:true }]
     })
   ]);

  res.json({
    total,
    results: categoria 
  })


};

const buscarProducto = async( termino='',res=response ) => {
  
  const esMongoId = ObjectId.isValid( termino );

  if( esMongoId ){
    const productoDB = await producto.findById( termino )
                            .populate('categoria','nombre');
    return res.json({
      results:(productoDB?[productoDB]:[])
    });
  };

  const regexp = new RegExp( termino, 'i' );

  console.log(regexp)

   const [ total, productoDB ] = await Promise.all([
     producto.count({ 
      $or: [{ nombre:regexp } ],
      $and: [{ estado:true }]
     }),
     producto.find({ 
      $or: [{ nombre:regexp } ],
      $and: [{ estado:true }]
     }).populate('categoria','nombre')
   ]);

  res.json({
    total,
    results: productoDB 
  })


} 


const buscar = ( req, res=response ) => {

  const { coleccion, termino } = req.params

  if( !coleccionesPermitidas.includes( coleccion )){
    return res.status(400).json({
      msg:`Las colecciones permitidas son :${ coleccionesPermitidas }`
    });
  }

  switch (coleccion) {
  case 'productos':
    buscarProducto( termino,res )

    break;
  case 'categorias':
    buscarCategorias( termino,res )
    break;
  case 'usuarios':
    buscarUsuarios( termino,res );
    break;
  
    default:
    res.status(500).json({
      msg:'opcion no encontrada'
    })
  }

}



module.exports = {
  buscar
}