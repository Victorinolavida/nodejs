import { Sequelize } from "sequelize";

const db = new Sequelize("node", "root", "20dpr1125z", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
export default db;

console.log("hola");
