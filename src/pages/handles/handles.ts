import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { localtime } from '../../utils/common';
import { HandleProvider } from '../../providers/handle/handle';
import { PageSize } from '../../model/pagesize';
import { HANDLE_PAGE } from '../pages.constants';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the HandlesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-handles',
  templateUrl: 'handles.html',
})
export class HandlesPage {
  isshow: boolean = true;
  myDate: string = localtime('fm');
  activeIndex: string = '0';
  page: PageSize;
  handles: Handle[][] = [[], []];
  status: any;
  refreshing: boolean = false;
  pages: any = {
    handle: HANDLE_PAGE
  };
  max: string = localtime('fm');
  canLoad: boolean[] = [true, true];
  subscription: Subscription;
  statusChange: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private handlePro: HandleProvider
  ) {
    this.subscription = this.handlePro.get().subscribe(res => {
      if (res.agree) {
        let id = this.handles[0].findIndex(v => v.guid == res.guid);
        let cache: Handle = this.handles[0][id];
        this.handles[0].splice(id, 1);
        cache.status = 2;
        cache.staName = '已审核';
        this.handles[1].unshift(cache);
      } else {
        let id = this.handles[0].findIndex(v => v.guid == res.guid);
        let cache: Handle = this.handles[0][id];
        this.handles[0].splice(id, 1);
        cache.status = 3;
        cache.staName = '审核不通过';
        this.handles[1].unshift(cache);
      }
    })
  }

  ionViewDidLoad() {
    this.handles[this.activeIndex] = undefined;
    setTimeout(() => this.doRefresh(), 350);
  }

  segmentChanged(event) {
    this.activeIndex = event.value;
    if (this.statusChange) {
      this.handles[this.activeIndex] = undefined;
      this.doRefresh();
      this.statusChange = false;
    }
  }

  timeChange() {
    this.handles[this.activeIndex] = undefined;
    this.statusChange = true;
    this.doRefresh();
  }

  doRefresh(event?) {
    this.refreshing = true;
    if (this.activeIndex == '0') {
      this.status = '1';
    } else if (this.activeIndex == '1') {
      this.status = '2,3';
    }
    let exception = (res) => {
      event && event.complete();
      this.fillHandle(this.activeIndex);
      this.refreshing = false;
    }
    this.page = new PageSize();
    this.handlePro.handleList({ ...this.page, status: this.status, month: this.myDate }).then(res => {
      if (!res || !res.list || !res.list.length) return exception(res);
      this.fillHandle(this.activeIndex, { list: res.list });
      event && event.complete();
      this.refreshing = false;
    }).catch(ex => exception(ex));
  }

  fillHandle(index, res: { list } = { list: null }) {
    this.handles[index] = res.list;
  }

  doInfinite(event) {
    this.page.pageIndex++;
    this.handlePro.handleList({ ...this.page, status: this.status, month: this.myDate }).then(res => {
      if (!res.list.length) {
        this.canLoad[this.activeIndex] = false;
        return;
      };
      res = res || { list: [] };
      res.list = res.list || [];
      this.handles[this.activeIndex] = this.handles[this.activeIndex].concat(res.list);
      event.complete();
    }).catch(ex => {
      event.complete();
    });
  }

  ionViewWillLeave() {
    this.isshow = false;
  }

  ionViewWillEnter() {
    this.isshow = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

interface Handle {
  /**
   * "chargeType": 0,// 收费类型（0:免费;1:收费;2:协议年费）
   */
  chargeType?: number;

  chargeTypeName?: string;

  createTime?: string;

  creatorName?: string;

  examName?: string;

  guid?: string;

  id?: number;

  role?: string;

  staName?: string;
  /**
   * "status": 2,// 工单审核状态（1:待审批;2:同意;3:不同意）
   */
  status?: number;
}