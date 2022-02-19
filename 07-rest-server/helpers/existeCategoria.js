const { categorias } = require('../models');


const existeCategoria = async( id='' ) => {


  const categoria = await categorias.findById( id );

  if( !categoria ) throw new Error('La categoria no existe');

}

module.exports = {
  existeCategoria
}