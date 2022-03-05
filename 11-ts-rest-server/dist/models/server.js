"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routers/usuarios"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //middlewares
        this.middlewares();
        //rutas
        this.router();
    }
    router() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //lectura dle body
        this.app.use(express_1.default.json());
        //carpta publica
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map