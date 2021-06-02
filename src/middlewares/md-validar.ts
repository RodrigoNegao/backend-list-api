import express from "express";
import { usersArray } from "../data";

function validarNome(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { name } = request.body;

  //console.log("valid Name Middleware ");

  if (!name) {
    return response.status(400).json({
      msg: "O nome deve ser informado",
    });
  }

  if (name.length < 3) {
    return response.status(400).json({
      msg: "O nome deve conter no minimo 3 caracteres",
    });
  }

  const existe = usersArray.find((f) => {
    return f.userName === name;
  });

  if (existe) {
    return response.status(400).json("Nome já Cadastrado");
  }

  next();
}


function validarPassword(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { password } = request.body;

  //console.log("valid Name Middleware");

  if (!password) {
    return response.status(400).json({
      msg: "Password dever ser informado corretamente",
    });
  }

  next();
}

export { validarNome, validarPassword };
