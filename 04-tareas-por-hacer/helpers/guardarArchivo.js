const fs = require("fs");

const archivo = "./database/data.json";

const guardarArchivo = (data) =>
  fs.writeFileSync(archivo, JSON.stringify(data));

const leerBf = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, { encoding: "utf-8" });

  console.log(info);
  return JSON.parse(info);
};

module.exports = {
  guardarArchivo,
  leerBf,
};
