const path = require('path');
const fs = require('fs');

class Ticket {
  constructor( numero,escritorio ) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
  
}



class TikectControl {

  constructor(){
    this.ultimo = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];


    //methods

    this.init();

  }

  get toJson(){
    return{
      ultimo:this.ultimo,
      today:this.today,
      tickets:this.tickets,
      ultimos4:this.ultimos4
    }
  }

  init(){
    const { today,ultimo,tickets,ultimos4 } = require('../data/data.json');

    if ( today == this.today ){
      this.tickets = tickets;
      this.ultimos4 = ultimos4;
      this.ultimo = ultimo;
    }else{
      //es otro dia
      this.guardarDB();
    }

    
  }

  guardarDB(){
    const dbPath = path.join(__dirname, '../data','data.json')
    fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) )
  };

  siguiente(){
    this.ultimo+=1;
    this.tickets.push( new Ticket( this.ultimo, null ) );

    this.guardarDB();

    return 'Ticket ' + this.ultimo;
  }

  atenderTicket ( escritorio ){
    //no tenemos tickets 
    if ( this.tickets.length === 0 ){ return null;}

    const ticket =  this.tickets.shift();
    ticket.escritorio = escritorio;

    this.ultimos4.unshift( ticket );

    if ( this.ultimos4.length > 4 ){
      this.ultimos4.slice( -1,1);
    }

    // console.log(this.ultimos4)

    this.guardarDB();

    return ticket;
  }
}


module.exports = TikectControl;