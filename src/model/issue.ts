export class issue {
  products: string[];
  prioritys: string[];
  type: number;
  level: number;
  title: string;
  exceptTime: string;
  contents: string;
  images: any[];
  typestr: string;
  levelstr: string;
  maxDate: string;
  minDate: string;
  constructor(obj: any = {}) {
    this.products = obj.products || ['产品操作类', '建议体验类', '运营活动类', '业务流程类'];
    this.prioritys = obj.prioritys || ['非常紧急', '紧急', '较重要', '一般'];
    this.type = obj.type || 1;
    this.level = obj.level || 2;
    this.title = obj.title;
    this.exceptTime = obj.exceptTime || this.defaultTime;
    this.contents = obj.contents;
    this.images = obj.images || [];
    this.typestr = obj.typestr || '产品操作类';
    this.levelstr = obj.levelstr || '紧急';
    let now : any;
    let y:any;
    let m: any;
    let d:any;
    let month:any;
    let day:any;
      now = new Date();
      y = now.getFullYear();
      m = now.getMonth() + 1;
      d = now.getDate();
      month = m < 10 ? '0' + m.toString() : m,
      day = d < 10 ? '0' + d.toString() : d; 
    this.minDate = `${y}-${month}-${day}`;
    this.maxDate = `${y+1}-${month}-${day}`; 
  }

   get defaultTime(): string {
    let date: any;
    let now: any;
    let year: any;
    let month: any;
    let day: any;
    now = new Date();
    date = new Date(now.getTime() + 7 * 24 * 3600 * 1000);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  }
}
