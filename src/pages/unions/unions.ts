import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UNIONCREATE_PAGE, UNION_PAGE } from '../pages.constants';
import { UnionProvider } from '../../providers/union/union';
import { PageSize } from '../../model/pagesize';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the UnionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unions',
  templateUrl: 'unions.html',
})
export class UnionsPage {
  isshow: boolean = true;
  page: PageSize;
  pages: any = {
    unioncreate: UNIONCREATE_PAGE
  };
  unions: Union[][] = [[], []];
  activeIndex: any = "0";
  totals: number[] = [];
  status: number;
  refreshing: boolean = false;
  subscription: Subscription;
  statusChange: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private unionPro: UnionProvider,
  ) {
    this.subscription = this.unionPro.get().subscribe(res => {
      if (res.createTime) {
        if (this.unions[0] == null) {
          this.unions[0] = [];
        }
        if (this.unions[1] == null) {
          this.unions[1] = [];
        }
        this.unions[0].unshift(res);
        this.unions[1].unshift(res);
      } else {
        this.unions[0].forEach(v => {
          if (v.guid == res.guid) {
            v.status = 4;
            v.staName = '已撤销';
          }
        })
        let index = this.unions[1].findIndex(v => v.guid == res.guid);
        this.unions[1].splice(index, 1);
      }
    })
  }

  ionViewDidLoad() {
    this.unions[this.activeIndex] = undefined;
    setTimeout(() => this.doRefresh(), 350);
  }

  segmentChanged(event) {
    this.activeIndex = event.value;
    if (this.unions[this.activeIndex] == null) return;
    if (event.value == '1' && this.statusChange) {
      this.unions[this.activeIndex] = undefined;
      this.doRefresh();
      this.statusChange = false;
    }
  }

  doRefresh(event?) {
    this.refreshing = true;
    this.status = Number(this.activeIndex);
    let exception = (res) => {
      event && event.complete();
      this.fillUnion(this.activeIndex);
      this.refreshing = false;
    }
    this.page = new PageSize();
    this.unionPro.unionList({ ...this.page, status: this.status || undefined }).then(res => {
      if (!res || !res.list || !res.list.length) return exception(res);
      let total = res.totalCount || 0;
      this.fillUnion(this.activeIndex, { list: res.list, total });
      event && event.complete();
      this.refreshing = false;
    }).catch(ex => exception(ex));
  }

  doInfinite(event) {
    this.page.pageIndex++;
    this.unionPro.unionList(Object.assign({ status: this.status || undefined }, this.page)).then(res => {
      res = res || { list: [] };
      res.list = res.list || [];
      this.unions[this.activeIndex] = this.unions[this.activeIndex].concat(res.list);
      event.complete();
    }).catch(ex => {
      event.complete();
    });
  }

  fillUnion(index, res: { list, total?: number } = { list: null }) {
    this.unions[index] = res.list;
    this.totals[index] = res.total;
  }

  goUnion(sheet: Union) {
    this.navCtrl.push(UNION_PAGE, sheet);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.isshow = false;
  }

  ionViewWillEnter() {
    this.isshow = true;
  }
}

interface Union {
  createTime?: string;
  examName?: string;
  guid?: string;
  hasNewReply?: boolean;
  id?: number;
  staName?: string;
  status?: number;
}