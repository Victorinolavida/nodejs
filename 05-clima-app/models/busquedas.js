const axios=require('axios');


class Busquedas{
  historial=['CDMX','Oaxaca'];
  constructor(){
    //Leer base de datos
  }

  get paramsMapbox(){
    return{
      'access_token':process.env.MAPBOX_KEY,
      'language':'es',
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


}




module.exports=Busquedas