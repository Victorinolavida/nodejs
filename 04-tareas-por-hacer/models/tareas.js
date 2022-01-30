/*

_listado={

  'uuidasdqwdas9dyasd':{id:1,dec:'asdasdasd asd ',comletadaEn:'12313' }
  'uuidasdqwdas9dyasd':{id:1,dec:'asdasdasd asd ',comletadaEn:'12313' }
}


*/

const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();

    this.listadoArr.forEach((tarea, i) => {
      const indice = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const completado = completadoEn ? "Completado".green : "Pendiente".red;

      console.log(`${indice}. ${desc} :: ${completado}`);
    });
  }

  listarTareas(completadas = true) {
    let contador = 0;
    console.log();
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const completado = completadoEn ? "Completado".green : "Pendiente".red;

      if (completadas) {
        if (tarea.completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${completado}`);
        }
      } else {
        if (!tarea.completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${completado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
      }
      tarea.completadoEn = new Date().toISOString();
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
