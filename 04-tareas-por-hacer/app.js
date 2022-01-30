require("colors");

const { guardarArchivo, leerBf } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTarasBorrar,
  confirmar,
  mostraListadoCheckList,
} = require("./helpers/inquirer");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerBf();

  if (tareasDB) tareas.cargarTareas(tareasDB);

  do {
    opt = await inquirerMenu();
    // console.log({ opt });

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarTareas();
        break;
      case "4":
        tareas.listarTareas(false);
        break;

      case "5":
        const ids = await mostraListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6": //borra
        const id = await listadoTarasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Está seguro");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea Borrada");
          }
        }
        break;
    }

    guardarArchivo(tareas.listadoArr);
    // await pausa();

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();

//libreria : inquirer:uuid
