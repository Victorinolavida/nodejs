const { Schema , model  } = require('mongoose')


const usuarioSchema = Schema({
  nombre:{
    type:String,
    required:[true,'el nombre es obligatorio']
  },
  correo:{
    type:String,
    required:[true, 'el correo es obligatorio']
  },
  password:{
    type:String,
    required:[true,'la contraseña es obligatoria']
  },
  img:{
    type:String
  },
  rol:{
    type:String,
    required:true,
    enum:['ADMIN_ROLE','USER_ROLE']
  },
  estado:{
    type:Boolean,
    default:true
  },
  google:{
    type:Boolean,
    default:false
  }
})

usuarioSchema.methods.toJSON = function() {
  const { __v, _id, password, ...usuario } = this.toObject();

  return {
    ...usuario,
    uid:_id
  };

};



module.exports = model( 'Usuario', usuarioSchema )