const express = require('express');
const app = express();
const hbs= require('hbs');
require('dotenv').config();

const port=process.env.PORT

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//servir contenido estatico
app.use(express.static('public'));

const info={
  nombre:'Victorino',
  titulo:'Pagina en Node'
}


// app.get('/', function (req, res) {
//   res.send('Home Page');
// });

app.get('/', function (req, res) {

  // res.sendFile(__dirname +'/public/index.html');

  res.render('home',info);

});

app.get('/generic', function (req, res) {

  //__dirname da la ruta del proyecto actual
  // res.sendFile(__dirname +'/public/generic.html');
  res.render('generic',info)

});

app.get('/elements', function (req, res) {

  //__dirname da la ruta del proyecto actual
  // res.sendFile(__dirname +'/public/elements.html');
  res.render('elements',info)

});


app.get('*', function (req, res) {
  //__dirname da la ruta del proyecto actual
  res.sendFile(__dirname +'/public/404.html');
});



app.listen(port,function(){
  console.log(`servidor corriendo en el puerto ${port}`)

});