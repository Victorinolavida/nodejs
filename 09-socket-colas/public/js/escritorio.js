
//REFERENCIAS HTML

const lblEscritorio = document.querySelector('h1');
const btnAtenter = document.querySelector('button');
const lblTicket = document.querySelector('small');
const alerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes');

const seachParams = new URLSearchParams( window.location.search );


if( !seachParams.has('escritorio') ){
  window.location='index.html';
  throw new Error('El escritorio es obligatorio')
}


const escritorio = seachParams.get('escritorio');
lblEscritorio.innerText = escritorio;
alerta.style.display =  'none';



const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtenter.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtenter.disabled = true
});


socket.on('ultimo-ticket',(ticket) => {
  // console.log(ticket)
  // lblNuevoTicket.innerText = `Ticket ${ticket}`
})

socket.on('tickets-pendientes', ( tickets ) => {
  // console.log(tickets)
  if ( tickets === 0 ){
    lblPendientes.style.display = 'none';
  }else{
    lblPendientes.style.display = '';
    lblPendientes.innerText = tickets;

  }
})

btnAtenter.addEventListener('click', () => {
  
  socket.emit( 'atender-ticket', { escritorio } ,( {ok, ticket, msg}) => {

    if( !ok ){
      alerta.style.display = '';
      lblTicket.innerText = 'Nadie';
      return alerta.innerText = msg
    }

    lblTicket.innerText = 'Ticket ' + ticket.numero;

  });

})
