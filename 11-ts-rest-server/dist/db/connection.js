"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("node", "root", "20dpr1125z", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});
exports.default = db;
console.log("hola");
//# sourceMappingURL=connection.js.map