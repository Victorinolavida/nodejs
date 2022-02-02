const axios=require('axios');
const fs=require('fs');
const { threadId } = require('worker_threads');

class Busquedas{
  historial=[];
  DbPath='./db/lugares.json'
  constructor(){
    //Leer base de datos
  this.leerDB()
  }

  get paramsMapbox(){
    return{
      'access_token':process.env.MAPBOX_KEY,
      'language':'es',
    }

  }
  get paramsOpenWeather(){
    return{
      'appid':process.env.OPENWEATHER_kEY,
      'lang':'es',
      'units':'metric'
    }
  }

  get historialCapitalizado(){

    const capitalizado=this.historial.map(lugar=>{

      let palabras=lugar.split(' ')


      palabras=palabras.map(el=>{
        return el[0].toUpperCase()+el.substring(1)
      })
      
      return palabras.join(' ')

    })

    return capitalizado

  }

  async climaLugar(lat,lon){
   try{

     const intance=axios.create({
       baseURL:`http://api.openweathermap.org/data/2.5/`,
       params:{
         ...this.paramsOpenWeather,
         lat,
         lon
       },
     })

    const {data}= await intance.get(`weather`)

    return{
      desc:data.weather[0].description,
      min:data.main.temp_min,
      max:data.main.temp_max,
      temp:data.main.temp

      }
   }catch(e){
     console.log(e)
   }
  }

  async ciudad(lugar=''){

    try {
      //peticion http
      const intance=axios.create({
        baseURL:`https://api.mapbox.com/`,
        params:this.paramsMapbox
      })
      
      const resp=await intance.get(`geocoding/v5/mapbox.places/${lugar}.json`)

      //regresar los lugares que coincidan con el lugar buscado
      return resp.data.features.map(lugar=>({
          id:lugar.id,
          nombre:lugar.place_name_es,
          lng:lugar.center[0],
          lat:lugar.center[1]
      }))

    } catch (error) {
      console.log('No se encontro nada')
      return [];
    }


  }

  agregarHistorial(lugar=''){
    //prevenir duplicados
    if(this.historial.includes( lugar.toLowerCase() )) {
      return
    };
    this.historial=this.historial.splice(0,5)

    this.historial.unshift( lugar.toLowerCase() )
    
    //grabar en DB
    this.guardarDB()

  }
  
  guardarDB(){
    const payload={
      historial:this.historial
    }
    fs.writeFileSync(this.DbPath,JSON.stringify(payload) )
  }

  leerDB(){


      if(!fs.existsSync(this.DbPath) ) return

    const file=fs.readFileSync(this.DbPath)
    //  si existe
    const data=JSON.parse( file,{encoding:'uft-8'}) 


     this.historial=data.historial


  }

}




module.exports=Busquedas
