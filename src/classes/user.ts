import { v4 as uuidv4 } from 'uuid';


class LoginUser {
  public id: string = uuidv4();
  public userName: string;
  public password: string;

  constructor(
    //id: number,
    userName: string,
    password: string,
  ) {
    //this.id = id;
    this.userName = userName;
    this.password = password;
  }
}

export default LoginUser;