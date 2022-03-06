"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routers/usuarios"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: "/api/usuarios",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        //coneccion bd
        this.dbConnection();
        //middlewares
        this.middlewares();
        //rutas
        this.router();
    }
    router() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
            }
            catch (error) {
                console.log(error);
                // throw new Error(`${error}`);
            }
        });
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //lectura dle body
        this.app.use(express_1.default.json());
        //carpta publica
        this.app.use(express_1.default.static("public"));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en ", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map