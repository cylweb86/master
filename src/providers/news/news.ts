import { Injectable } from '@angular/core';
import { HttpProvider } from '../../providers/http';
import { Subject } from '../../../node_modules/rxjs/Subject';
/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {
  private countSource = new Subject<any>();
  count$ = this.countSource.asObservable();
  constructor(
    private http: HttpProvider
  ) { }

  /**
   * 查询用户界面红点数量
   */
  all() {
    return this.http.post('Message/RedPointCount').then(res => {
      this.countSource.next(res || { companyNotice: 0, homeMessage: 0, systemMessage: 0 });
      return Promise.resolve();
    }).catch(ex => ex);
  }

  /**
   * 拉取公司通知清单
   */
  companys(param) {
    return this.http.post('Message/Notices', param);
  }

  /**
   * 查询系统提示清单
   */
  systems(param) {
    return this.http.post('Message/Tips', param);
  }

  informs(param, type) {
    return this.http.post(`Message/${type ? 'Tips' : 'Notices'}`, param);
  }

  /**
   * 查看公司通知详情
   */
  company(param) {
    return this.http.post('Message/Notice', param);
  }

  /**
   * 系统提示详情
   */
  system(param) {
    return this.http.post('Message/Tip', param);
  }

  /**
   * 约考提示信息接入
   */
  appoint(param) {
    return this.http.post('Message/BespeakExam', param);
  }
}
