import dotenv from 'dotenv';
import Server from './models/server';

//configuracion dotenv
dotenv.config();




const server = new Server(); 


// iniciando servidor

server.listen()