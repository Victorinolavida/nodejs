const TikectControl = require("../models/ticket-control");


const ticketControl = new TikectControl();




const socketController = ( socket ) => {

  

  socket.emit( 'ultimo-ticket', ticketControl.ultimo );
  socket.emit( 'estado-actual', ticketControl.ultimos4 );
  socket.emit( 'tickets-pendientes', ticketControl.tickets.length );



  socket.on( 'siguiente-ticket', ( payload, callback ) => {

    const siguiente = ticketControl.siguiente();

    callback( siguiente )

    // console.log(payload)
    // this.io.emit( 'enviar-mensaje', payload )
    // socket.broadcast.emit( 'enviar-mensaje', payload )

  });

  socket.on( 'atender-ticket', ( { escritorio }, callback ) => {

    console.log(!escritorio)

    if( !escritorio ){
      return callback({
        ok:false,
        msg:'El escritorio es obligatorio'
      })
    }
    

    const ticket = ticketControl.atenderTicket( escritorio );

    if ( !ticket ){
      callback({
        ok:false,
        msg:'Ya no hay tickets pendiente'
      })
    }else{
      callback({
        ok:true,
        ticket
      })
    }

  })

};


module.exports = {
  socketController
}