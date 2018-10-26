import { Injectable } from '@angular/core';
import { HttpProvider } from '../http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private subject = new Subject<any>();
  constructor(
    public http: HttpProvider
  ) { }
  /**
   * 获取区域列表
   */
  region(param?) {
    return this.http.post('data/userArea', param);
  }

  /**
   * 获取详细信息
   */
  msg(param) {
    return this.http.post('data/info', param);
  }

  /**
   * 获取学校列表
   */
  institute(param) {
    return this.http.post('data/schoollist', param);
  }

  /**
   * 获取用户信息
   */
  userinfo(param?) {
    return this.http.post('Usercenter/info', param)
  }

  /**
   * 下载url
   */
  download(param?) {
    return this.http.post('data/downloadurl', param);
  }
  /**
   * 趋势数据
   */
  trend(param) {
    return this.http.post('data/history', param);
  }
  /**
   * 
   * 获取学校具体区域
   */
  area(param) {
    return this.http.post('data/schoolbaseinfo', param);
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
