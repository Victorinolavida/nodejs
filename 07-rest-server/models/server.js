const express=require('express');
const cors=require('cors');
const { dbConection } = require('../database/config');


class Server{

  constructor(){
    this.app=express();
    this.port=process.env.PORT;
    this.usuariosPath='/api/usuarios';
    this.authPath='/api/auth';

    //concetar a DB
    this.conectarDB();

    //middlewares
  
    this.middleware();
    
    //rutas de la app
    this.routers();

  }

  async conectarDB(){

    await dbConection();

  }


  middleware(){

    //CORS
    this.app.use( cors() );

    //lectura y aparceo del body
    this.app.use( express.json() );

    //Directorio público
    this.app.use(express.static('public'));

  }
  
  routers(){

      this.app.use(this.usuariosPath,require('../routes/userios'));
      this.app.use(this.authPath,require('../routes/auth'));
  }


  start(){
    this.app.listen(this.port  ,()=>{
      console.log('servidor corriendo en ',this.port);
    });
    

  }


}


module.exports=Server;
