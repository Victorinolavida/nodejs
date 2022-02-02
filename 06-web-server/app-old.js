const http=require('http')

http.createServer((req,res)=>{

  // res.writeHead(200,{'Content-Type':'text/plain'})

  res.setHeader('Content-Disposition','attachment; filename=prueba.csv')

  res.writeHead(200,{'Content-Type':'application/csv'})

  res.write('id,Nombre \n')
  res.write('1,Juan \n')
  res.write('2,Pedro \n')
  res.write('3,María \n')
  res.write('4,Ximena \n')
  res.write('5,karla \n')
  
  res.end()

})
.listen(8080)


console.log('Escuachando el puerto', 8080 ); 

