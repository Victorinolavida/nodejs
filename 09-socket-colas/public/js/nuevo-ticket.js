const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const button = document.querySelector('button');

console.log(lblNuevoTicket)
console.log(button)

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    button.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    button.disabled = true
});


socket.on('ultimo-ticket',(ticket) => {
  // console.log(ticket)
  lblNuevoTicket.innerText = `Ticket ${ticket}`
})


button.addEventListener('click', () => {
  socket.emit( 'siguiente-ticket', null , ( ticket ) => {
    console.log(ticket)
    lblNuevoTicket.innerText = ticket
  })
})