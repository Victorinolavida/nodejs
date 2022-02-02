const {response}=require('express')


const usuariosGET=(req,res=response) => {
  
  const { q , nombre='No name' , apellido }=req.query; 
  
  res.json({
    msg:"API-get controller",
    q,
    nombre,
    apellido
  });

}

const usuariosPOST=(req,res) => {
  const { nombre , edad }=req.body;
  res.status(201).json({
    msg:"API-post controller",
    nombre,
    edad
  });
};

const usuariosPUT=(req,res) => {

  //id esta en la ruta
  const id=req.params.id;

  res.json({
    msg:"API-put controller",
    id
  });


}

const usuariosDELETE=(req,res) => {
  res.json({
    msg:"API-delete controller"
  });
}

const usuariosPATCH=(req,res) => {
  res.json({
    msg:"API-patch controller"
  });
};


module.exports={
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
  usuariosPATCH,
  
}