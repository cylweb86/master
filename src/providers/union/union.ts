import { Injectable } from '@angular/core';
import { HttpProvider } from '../http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  Generated class for the UnionProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnionProvider {
  private subject = new Subject<any>();
  constructor(private httpPro: HttpProvider) { }
  // 创建联考工单
  unionCreate(param) {
    return this.httpPro.post('Business_Approval', param);
  }
  // 获取单条联考工单
  singleUnion(param) {
    return this.httpPro.get('Business_Approval', param);
  }
  // 我创建的联考工单
  unionList(param) {
    return this.httpPro.post('Business_Approval/MyOrders', param)
  }
  // 撤回联考工单
  recall(param) {
    return this.httpPro.post('Business_Approval/Revoke', param);
  }
  // 补充内容
  add(param) {
    return this.httpPro.post('Business_Approval/Additional', param);
  }
  /**
   *  审批联考工单 guid (contents=>ispass=2不可空) ispass(1:同意;2:不同意)
   */
  approval(param) {
    return this.httpPro.post('Business_Approval/Approve', param);
  }

  /**
   * 申请发布 guid作为参数
   */
  release(param) {
    return this.httpPro.post('Business_Approval/ApplyRelease', param);
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
