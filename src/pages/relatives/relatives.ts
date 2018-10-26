import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { localtime } from '../../utils/common';
import { ArrangeProvider } from '../../providers/arrange/arrange';
import { PageSize } from '../../model/pagesize';
import { APPOINT_PAGE } from '../../pages/pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the RelativesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatives',
  templateUrl: 'relatives.html',
})
export class RelativesPage {
  stateArr: string[] = ['全部', '申请中', '约考中', '考试中', '已完成', '约考失败'];
  isshow: boolean = true;
  myDate: string = localtime('fm');
  max: string = localtime('fm');
  page: PageSize;
  arranges: any[];
  total: number;
  review: number = -1;
  modal: boolean = false;
  pages: any = {
    appoint: APPOINT_PAGE
  }
  choice: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private arrangePro: ArrangeProvider,
    private statusBar: StatusBar
  ) { }

  ionViewDidLoad() {
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh(event?) {
    this.page = new PageSize();
    let exception = (res) => {
      event && event.complete();
      this.arranges = null;
    }
    this.arrangePro.relevant({ ...this.page, citys: this.navParams.get('citys'), provinces: this.navParams.get('provinces'), date: this.myDate, review: this.review }).then(res => {
      if (!res || !res.list || !res.list.length) return exception(res);
      this.arranges = res.list;
      this.total = Number(res.totalNum);
      event && event.complete();
    }).catch(ex => exception(ex));
  }

  doInfinite(event) {
    // || this.navParams.get('provinces')
    this.page.pageIndex++;
    this.arrangePro.relevant({ ...this.page, citys: this.navParams.get('citys'), provinces: this.navParams.get('provinces'), date: this.myDate, review: this.review }).then(res => {
      res = res || { list: [] };
      res.list = res.list || [];
      this.arranges = this.arranges.concat(res.list);
      event.complete();
    }).catch(ex => {
      event.complete();
    });
  }

  changed(event) {
    let index: any = this.stateArr.findIndex(v => v == event.value);
    if (index == 0) {
      index = -1;
    } else if (index == 1) {
      index = 2;
    } else {
      index = index * 10;
    }
    this.review = index;
    setTimeout(() => this.modal = false, 50);
    this.arranges = undefined;
    this.doRefresh();
  }

  timeChange() {
    this.arranges = undefined;
    this.doRefresh();
  }

  ionViewWillLeave() {
    this.isshow = false;
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.isshow = true;
  }

}
