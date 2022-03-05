const { Socket } = require("socket.io")
const { comprobarJWT } = require('../helpers')
const { ChatMensajes } = require("../models")

const chatMensajes = new ChatMensajes();


const socketController = async( socket = new Socket(),io ) => {
  // console.log('cliente conectado ', socket.id)
  const usuario = await comprobarJWT( socket.handshake.headers['x-token'] )

  if ( !usuario ){
    return socket.disconnect();
  }
  //conectando a una sala priovada
  socket.join( usuario.id )

  //agregar el usuario conectado
  chatMensajes.conectarUsuario( usuario )
  io.emit( 'usuarios-activos',chatMensajes.usuariosArr )

  //Eliminar usuario que se desconecta
  socket.on( 'disconnect', () => {

    chatMensajes.desconectarUsuario( usuario._id )
    io.emit( 'usuarios-activos',chatMensajes.usuariosArr )

    
  })

  socket.on('enviar-mensaje', ({ uid,msg })=> {

    if( uid ){
      //mensaje privado
      socket.to( uid ).emit('mensaje-privado',{ de:usuario.nombre, msg })
      console.log(uid)
      console.log({ de:usuario.nombre, msg })
    }else{
      // console.log(payload)
      chatMensajes.enviarMensaje(usuario.id, usuario.nombre, msg);
      io.emit('recibir-mensaje',chatMensajes.ultimos)
    }
  })

}


module.exports = {
  socketController
}
