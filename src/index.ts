import express, { Request, Response } from "express";
import cors from "cors";
import { IUser } from "./interface/IUser";
import { validarNome,validarPassword } from "./middlewares/md-validar";
import { usersArray, listArray } from "./data";
import LoginUser from "./classes/user";
import Message from "./classes/message";
import { IMessage } from "./interface/IMessage";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//Rotas
app.get("/", (request: Request, response: Response) => {
  return response.send("Pagina Principal");
});

//POST Criar login - SignIn
app.post("/signin",validarNome,validarPassword,
 (request: Request, response: Response) => {
  //localhost:3000/users
  // {
  //     "name": "Joao",
  //     "passoword":"0000",
  // }
  const { name, password }: IUser = request.body;

  const user = new LoginUser(name, password);

  usersArray.push(user);
  console.log(user);
  return response.status(200).json("Cadastrado com sucesso");
});

//POST Verificar Login
app.post("/login",
 (request: Request, response: Response) => {
  //http://localhost:3000/login"
  const { name, password }: IUser = request.body;

  const user = usersArray.find((f) => {
    if (f.userName === name && f.password === password) return f } );
  //console.log('log',user);
  if (!user) {
    return response.status(404).json({
      msg: "Usuário e Senha estão errados",
    });
  }

  //Arrumar a ordem transacions por ultimo
  // const resposta1 = response.json({
  //   user,
  // });
  return response.status(200).json(true);
});

//GET /users
app.get("/messages", (request: Request, response: Response) => {
  //localhost:3333/users
  //console.log(usersArray);
  return response.json({
    List: listArray
  });
});

var item:number = 0;
//POST Criar Message
app.post("/message",
 (request: Request, response: Response) => {
  //localhost:3000/messages
  // {
  //     "title": "Joao",
  //     "detail":"0000",
  // }
  const { title, detail }: IMessage = request.body;

  item += +1;
  const list = new Message(item,title, detail);

  listArray.push(list);
  //console.log(user);
  return response.status(200).json({msg:"Cadastrado da Message com sucesso"});
});

// Atualizar um registro específico -- Insominia PUT
app.put("/message/:item", (request: Request, response: Response) => {
  const { item }: { item?: string } = request.params;
  const {
    title,
    detail,
  }: IMessage = request.body;

  const itemInt: number = parseInt(item);
  // encontrar o registro que queremos alterar
  const list = listArray.find((f) => {
    return f.id === itemInt;
  });

  if (!list) {
    return response.status(404).json({
      msg: "Message não encontrado",
    });
  }

  //Não Transpila pq pode estar vazio
  list.title = title;
  list.detail = detail;

  return response.status(200).json({success:true});
});

// Excluir um user a partir de um ID
app.delete("/message/:item", (request: Request, response: Response) => {
  const { item }: { item?: string } = request.params;

  const itemInt: number = parseInt(item);

  const indice = listArray.findIndex((f) => {
    return f.id === itemInt;
  });

  if (indice === -1) {
    return response.status(404).json({
      msg: "Item não encontrado",
    });
  }

  // const user = listArray.splice(indice, 1);
  listArray.splice(indice, 1);
  return response.status(200).json({msg:"delete"});
});


app.listen(process.env.PORT || 3000);
