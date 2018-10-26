export class content{
  description : string;
  time : string;
  images ? : any[];
  constructor(obj){
    this.description = obj.description;
    this.time = obj.time;
    this.images = obj.images || [];
  }
}

export class response{
  description : string;
  time : string;
  name:string;
  constructor(obj){
    this.description = obj.description;
    this.time = obj.time;
    this.name = obj.name;
  }
}


export class sheetMsg{
  code:number;
  contents:content[];
  createTime:string;
  exceptTime:string;
  level:number;
  responses: response[];
  status:number;
  title:string;
  type:number;
  constructor(obj){
    this.code = obj.code || 0;
    this.contents = obj.contents || [];
    this.createTime = obj.createTime || '';
    this.exceptTime = obj.exceptTime || '';
    this.level = obj.level || 0;
    this.responses = obj.responses || [];
    this.status = obj.status;
    this.title = obj.title || '';
    this.type = obj.type || 0;
  }
}
