//import { v4 as uuidv4 } from 'uuid';


class Message {
    //public id: string = uuidv4();
    public id: number;
    public title:string;
    public detail:string;
    constructor(id: number,title:string,detail:string){
        this.id = id;
        this.title = title;
        this.detail = detail;
    }  
}

export default Message;