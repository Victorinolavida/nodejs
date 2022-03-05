import { Request, Response } from "express";


export const getUsuarios = ( req:Request, res:Response) => {
  res.json({
    msg:'Get-usuarios'
  })
};


export const getUsuario = ( req:Request, res:Response) => {

  const { id } = req.params;

  res.json({
    msg:'Get-usuario',
    id
  })
};

export const postUsuario = ( req:Request, res:Response) => {

  const { body } = req;
  console.log(req.body)

  res.json({
    msg:'post-usuario',
    body
  })
};

export const putUsuario = ( req:Request, res:Response) => {

  const { id } = req.params; 
  const { body } = req;

  res.json({
    msg:'put-usuario',
    body
  })
};

export const deleteUsuario = ( req:Request, res:Response) => {

  const { id } = req.params; 

  res.json({
    msg:'delete-usuario',
    id
  })
};



