import express, { Request, Response } from "express";
import cors from "cors";
import { IUser } from "./interface/IUser";
import { validarAge, validarCpf, validarEmail, validarNome, validarTransactions, validarUser } from "./middlewares/md-validar";
import { usersArray } from "./data";
import LoginUser from "./classes/user";


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//Rotas
app.get("/", (request: Request, response: Response) => {
  return response.send("Pagina Principal");
});

//POST Criar login
app.post("/login",validarNome,validarCpf,validarEmail, validarAge,
 (request: Request, response: Response) => {
  //localhost:3333/users
  // {
  //     "name": "Joao",
  //     "passoword":"0000",
  // }
  const { name, passoword }: IUser = request.body;

  const user = new LoginUser(name, passoword);

  // const existe = usersArray.find((f) => {
  //   return f.cpf === cpf;
  // });

  // if (existe) {
  //   return response.status(400).json("CPF já Cadastrado");
  // }

  usersArray.push(user);
  console.log(user);
  return response.status(200).json("Cadastrado com sucesso");
});

//GET /users/:id
app.get("/users/:userId",validarUser, (request: Request, response: Response) => {
  //http://localhost:3333/users/:id"
  let { userId }: { userId?: string } = request.params;

  const idInt: number = parseInt(userId);

  const user = usersArray.find((f) => f.id === idInt);

  // if (!user) {
  //   return response.status(404).json({
  //     msg: "Usuário não encontrado",
  //   });
  // }

  //Arrumar a ordem transacions por ultimo
  const resposta1 = response.json({
    user,
  });
  return response.status(200).json(resposta1);
});

//GET /users
app.get("/users", (request: Request, response: Response) => {
  //localhost:3333/users
  //console.log(usersArray);

  return response.json({
    User: usersArray,
  });
});

// Atualizar um registro específico -- Insominia PUT
app.put("/users/:userId", validarUser, (request: Request, response: Response) => {
  const { userId }: { userId?: string } = request.params;
  const {
    name,
    cpf,
    email,
    age,
  }: { name: string; cpf: string; email: string; age: number } = request.body;

  const idInt: number = parseInt(userId);
  // encontrar o registro que queremos alterar
  const user = usersArray.find((f) => {
    return f.id === idInt;
  });

  if (!user) {
    return response.status(404).json({
      msg: "Usuário não encontrado",
    });
  }

  //Não Transpila pq pode estar vazio
  user.name = name;
  user.cpf = cpf;
  user.email = email;
  user.age = age;

  return response.status(200).json(user);
});

// Excluir um user a partir de um ID
app.delete("/users/:userId", validarUser, (request: Request, response: Response) => {
  const { userId }: { userId?: string } = request.params;

  const idInt: number = parseInt(userId);

  const indice = usersArray.findIndex((f) => {
    return f.id === idInt;
  });

  // if (indice === -1) {
  //   return response.status(404).json({
  //     msg: "Usuário não encontrado",
  //   });
  // }

  const user = usersArray.splice(indice, 1);

  return response.status(200).json(user);
});


app.listen(process.env.PORT || 3000);
