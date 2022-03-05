//html Referencias
const txtUid = document.querySelector('#txtUid');
const txtMes = document.querySelector('#txtMes');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const bntSalir = document.querySelector('#bntSalir');



var url = ( window.location.hostname.includes('localhost') )
? 'http://localhost:8080/api/auth/'
: 'https://restserver-curso-fher.herokuapp.com/api/auth/';




let usuario = null;
let socket = null;

//validar token del localStorage
const validarJWT = async() =>{

  const token = localStorage.getItem('token') || '';
  console.log(token)
  if (token.length <= 10){
    window.location = 'index.html'
    throw new Error('NO hay token en el servidor')
  };

  const resp = await fetch(url,{
    headers:{'x-token': token}
  });

  const { usuario: userDB, token: tokenDB } = await resp.json();
  localStorage.setItem('token', tokenDB);
  usuario=userDB;

  // console.log(userDB,tokenDB)
  document.title = usuario.nombre;

  await conectarSocket();
}

const conectarSocket = async() => {
  
  socket = io({
    'extraHeaders': {
      'x-token': localStorage.getItem('token')
    }
  });

  socket.on('connect', ()=>{
    console.log('online')
  });

  socket.on('recibir-mensaje', dibujarMensajes);

  socket.on('usuarios-activos', dibujarUsuarios )

  socket.on('mensaje-privado', (payload) => {
    console.log(payload)
    console.log('olass')
  })

};

const dibujarUsuarios = ( usuarios = [] ) => {
  let html = '';

  usuarios.forEach( ({ nombre,uid }) => {

    html += `
      <li>
        <p>
          <h5 class="text-success"> ${ nombre } </h5>
          <span class="fs-6 text-muted">${ uid }</span>
        </p>
      </li>
    `
  })
  ulUsuarios.innerHTML = html;
}



const dibujarMensajes = ( mensajes = [] ) => {
  let html = '';

  mensajes.forEach( ({ nombre,mensaje }) => {

    
    html += `
      <li>
        <p>
          <h5 class="text-primary"> ${ nombre } </h5>
          <span>${ mensaje }</span>
        </p>
      </li>
    `
  })
  ulMensajes.innerHTML = html;
}

txtMes.addEventListener( 'keyup', ({key})=>{
  // console.log(key)
  const msg = txtMes.value;
  const uid = txtUid.value;

  if ( key !== 'Enter' ) return;
  if( msg.trim().length === 0 ) return;

  socket.emit( 'enviar-mensaje', { msg,uid } )

  txtMes.value = '';
  txtUid.value= '';

})


const main = async() =>{

  //validarJWT
  await validarJWT();
}


main();