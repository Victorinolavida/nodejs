const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      productos: "/api/productos",
      uploads: "/api/uploads",
    };

    //concetar a DB
    this.conectarDB();

    //middlewares

    this.middleware();

    //rutas de la app
    this.routers();
  }

  async conectarDB() {
    await dbConection();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    //lectura y aparceo del body
    this.app.use(express.json());

    //Directorio público
    this.app.use(express.static("public"));


    //carga de archivo

    // Note that this option available for versions 1.0.0 and newer. 
    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));

  }

  routers() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/producto"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.usuarios, require("../routes/userios"));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en ", this.port);
    });
  }
}

module.exports = Server;
