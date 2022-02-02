const express=require('express');
const cors=require('cors')


class Server{

  constructor(){
    this.app=express();
    this.port=process.env.PORT
    this.usuariosPath='/api/usuarios'

    //middlewares
  
    this.middleware()
    
    //rutas de la app
    this.routers()

  }

  middleware(){

    //CORS
    this.app.use( cors() );

    //lectura y aparceo del body
    this.app.use( express.json() )

    //Directorio público
    this.app.use(express.static('public'));

  }

  routers(){

      this.app.use(this.usuariosPath,require('../routes/userios'))
  }


  start(){
    this.app.listen(this.port  ,()=>{
      console.log('servidor corriendo en ',this.port)
    });
    

  }


}


module.exports=Server;
