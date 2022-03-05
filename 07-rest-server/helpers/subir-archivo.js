const { v4: uuidv4 } = require('uuid');
const path = require('path');


const subirArchivo = ( files, extensionesValidas = [ 'png', 'jpg', 'jgep', 'gif' ],carpeta='' )=>{ 

  return new Promise((resolve, reject) => { 

    const { archivo } = files;
  
    const nombreCortado = archivo.name.split('.');
    
    const extension = nombreCortado[ nombreCortado.length-1 ]


    if( !extensionesValidas.includes( extension ) ){
      reject(`la extension ${ extension } no es válida - ${ extensionesValidas }`);
      return;
    }
    
    const nombreTemp = uuidv4() +'.'+ extension;

    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const dirPath = path.join( __dirname, '../uploads/' + carpeta );
    const uploadPath = path.join( dirPath, nombreTemp );
    
    // Use the mv() method to place the file somewhere on your server
  
    archivo.mv(uploadPath, function(err) {
      if (err){
        reject( error )
      }
      resolve( nombreTemp )
    });
   })
}




module.exports = {
  subirArchivo

}