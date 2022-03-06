import express, { Application } from "express";
import userRoutes from "../routers/usuarios";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    //coneccion bd
    this.dbConnection();
    //middlewares
    this.middlewares();
    //rutas
    this.router();
  }

  router() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  async dbConnection() {
    try {
      await db.authenticate();
    } catch (error) {
      console.log(error);
      // throw new Error(`${error}`);
    }
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //lectura dle body
    this.app.use(express.json());

    //carpta publica
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en ", this.port);
    });
  }
}

export default Server;
