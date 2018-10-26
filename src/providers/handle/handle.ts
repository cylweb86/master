import { HttpProvider } from '../http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  Generated class for the HandleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HandleProvider {
  private subject = new Subject<any>();
  constructor(private httpPro: HttpProvider) { }
  //处理者的工单列表
  handleList(param) {
    return this.httpPro.post('Business_Approval/HandlerOrders', param);
  }
  send(msg) {
    this.subject.next(msg);
  }

  clear() {
    this.subject.next();
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }

}
