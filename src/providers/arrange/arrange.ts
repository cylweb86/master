import { Injectable } from '@angular/core';
import { HttpProvider } from '../../providers/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  Generated class for the ArrangeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArrangeProvider {
  private subject = new Subject<any>();
  private PREFIX = 'https://letsexam.7net.cc/';
  constructor(public http: HttpProvider) { }
  /**
   * 获取约考信息列表
   */
  examList(param) {
    return this.http.post(`${this.PREFIX}api/SevenDay/ExamInfoList`, param);
  }

  /**
   * 获取相关约考信息
   */
  relevant(param) {
    return this.http.post(`${this.PREFIX}api/SevenDay/ExamOtherList`, param);
  }

  /**
   * 获取详细信息
   */
  arrinfo(param) {
    return this.http.get(`${this.PREFIX}api/PublicExam/GetPreInfo`, param);
  }

  /**
   * 审核通过
   */
  agree(param) {
    return this.http.post(`${this.PREFIX}api/SevenDay/AuditPass`, param);
  }

  /**
   * 审核不通过
   */
  disagree(param) {
    return this.http.post(`${this.PREFIX}api/SevenDay/AuditNoPass`, param);
  }

  /**
   * 单个学校参与列表
   */
  aschool(param) {
    return this.http.post(`${this.PREFIX}api/SevenDay/GetExamOtherSchool`, param);
  }



  send(message) {
    this.subject.next(message);
  }

  clear() {
    this.subject.next();
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }

}
