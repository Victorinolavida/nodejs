const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config()


const main=async ()=>{
  
  const busquedas= new Busquedas();

  let opt;

  
  do {
    
    opt=await inquirerMenu() 


    switch (opt) {
      case 1:
        //Mostrar mensaje 
        const termino=await leerInput('Ciudad:');
      
        //Buscar los lugares
        const lugares=await busquedas.ciudad(termino)
        const id=await listarLugares(lugares);
        
        //seleccionar el lugar
        const lugarSel=lugares.find(lugar=>lugar.id===id)


        //mostrar resultados

        console.log('\n Informacion de la ciudad\n '.green);
        console.log('Ciudad:',lugarSel.nombre);
        console.log('Lat:',lugarSel.lat);
        console.log('Lng:',lugarSel.lng);
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');

        break;
    
      default:
        break;
    }


    if(opt!==0) await pausa()

  } while (opt!==0);

}



main()

