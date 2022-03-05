const express = require("express");
const cors = require("cors");
const { socketController } = require("../socket/controller");

class Server {
  constructor() {

    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer( this.app );
    this.io = require('socket.io')( this.server  )

    this.paths = {};

    //middlewares

    this.middleware();

    //rutas de la app
    this.routers();

    //sockets
    this.sockets();
  }

  middleware() {

    //CORS
    this.app.use(cors());

    //Directorio público
    this.app.use(express.static("public"));
  }

  routers() {}

  sockets() {
    this.io.on( 'connection', socketController);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log("servidor corriendo en ", this.port);
    });
  }
}

module.exports = Server;
