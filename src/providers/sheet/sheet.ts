import { HttpProvider } from '../http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { INVALIDISSUE } from '../providers.constants';
/*
  Generated class for the MysheetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class SheetProvider {

  constructor(public http: HttpProvider, public storage: Storage) {

  }

  /**
   * 获取工单列表
   */
  issues(data) {
    return this.delInvalids()
      .then((invalids) => {
        invalids = invalids || [];
        return this.http.get('work/workOrders', data)
          .then(res => {
            res = res || {};
            res.list = res.list || [];
            res.list = res.list.filter(item => { return invalids.indexOf(item.guid) == -1 })
            return res;
          })
      })
  }

  /**
   * 获取单个工单信息
   */
  issue(data) {
    return this.http.get('work', data)
  }
  /**
   * 内容补充
   */
  addcon(data) {
    return this.http.post('work/AddContent', data)
  }

  /**
   * 撤回工单
   */
  cancel(data) {
    return this.http.post('work/Cancel', data)
  }

  /**
   * 重启工单
   */
  resheet(data) {
    return this.http.post('work/ReStart', data)
  }

  /**
   * 创建工单
   */
  createsheet(data) {
    return this.http.post('work', data)
  }

  /**
   * 撤销工单
   */
  dealsheet(data, api) {

    return this.http.post('work/' + api, data);
  }

  private delInvalids() {
    return this.storage.get(INVALIDISSUE).then((issues = []) => {
      issues && issues.length && issues.forEach(item => this.deletesheet({ guid: item }).catch(ex => ex));
      this.storage.set(INVALIDISSUE, []);
      return issues;
    })
  }

  private addInvalids(guid) {
    return this.storage.get(INVALIDISSUE).then((issues = []) => {
      issues = issues || [];
      if (issues.indexOf(guid) == -1) {
        issues.push(guid)
        return this.storage.set(INVALIDISSUE, issues);
      }

    })
  }

  private removeInvalids(guid) {
    return this.storage.get(INVALIDISSUE).then((issues = []) => {
      if (!issues) return;
      let index = issues.indexOf(guid);
      if (issues.indexOf(guid) > -1) {
        issues.splice(index, 1);
        return this.storage.set(INVALIDISSUE, issues);
      }
    })
  }


  /**
   * 图片上传失败后删除图片
   */
  deletesheet(data) {
    this.addInvalids(data.guid);
    return this.http.post('work/DeleteData', data).then(res => {
      this.removeInvalids(data.guid);
      return res;
    })
  }

  /**
   * 补充内容
   */
  addcontent(data) {
    return this.http.post('work/AddContent', data);
  }

}
