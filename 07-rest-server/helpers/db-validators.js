const producto = require('../models/producto');
const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async(rol='')=>{
  const existeRol = await Role.findOne({rol})
  if( !existeRol ){
          throw new Error(`El rol ${ rol } no esta registrado en la base de dato`);
  }
}

const emailExiste = async(correo) => {

  const correoBD = await usuario.findOne({correo})

  if( correoBD ) throw new Error( 'Ese corre ya esta registrado' )

}

const existeUsuarioId = async( id = "" ) => {
//verificar si el id existe

const idExiste = await usuario.findById( id )

if( !idExiste ) {
  throw new Error( `El id: ${ id } NO le pertenece a ningun usuario registrado`);
};

}

const existeProducto = async( id ) => {

const produc = await producto.findById( id );

if( !produc ){
  throw new Error( `El id: ${ id } NO le pertenece a ningun producto registrado`);
}


}

module.exports = {
  esRolValido,
  emailExiste,
  existeProducto,
  existeUsuarioId
}