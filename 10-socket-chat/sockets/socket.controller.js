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
  //agregar el usuario conectado
  chatMensajes.conectarUsuario( usuario )
  io.emit( 'usuarios-activos',chatMensajes.usuariosArr )

  //Eliminar usuario que se desconecta
  socket.on( 'disconnect', () => {

    chatMensajes.desconectarUsuario( usuario._id )
    io.emit( 'usuarios-activos',chatMensajes.usuariosArr )

    
  })

}


module.exports = {
  socketController
}
