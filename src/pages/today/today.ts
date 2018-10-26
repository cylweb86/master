import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodayProvider } from '../../providers/today/today';
import { localtime } from '../../utils/common';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the TodayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {
  revenue: any;
  time: any;
  method: any;
  state: any;
  now: string = localtime('ch');
  switch: boolean = false;
  today = {
    totalM: 0,
    totalT: 0,
    revenueC: 0,
    revenueE: 0,
    timeC: 0,
    timeE: 0,
    alipay: 0,
    unionpay: 0,
    wechatpay: 0
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todayPro: TodayProvider,
    private statusBar: StatusBar
  ) { }

  ionViewDidLoad() {
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh(event?) {
    let exception = (res) => {
      this.state = null;
      event && event.complete();
    }
    this.todayPro.todayinfo().then(res => {
      if (!res || !Object.keys(res).length) return exception(res);
      let a1, b2, c3, d4, e5, f6;
      if (!res.cport) {
        this.today.revenueC = 0;
        this.today.timeC = 0;
        a1 = b2 = c3 = 0;
      } else {
        this.today.revenueC = (res.cport.wechat ? res.cport.wechat.money : 0) + (res.cport.alipay ? res.cport.alipay.money : 0) + (res.cport.unionpay ? res.cport.unionpay.money : 0);
        a1 = res.cport.wechat ? res.cport.wechat.count : 0;
        b2 = res.cport.alipay ? res.cport.alipay.count : 0;
        c3 = res.cport.unionpay ? res.cport.unionpay.count : 0;
        this.today.timeC = a1 + b2 + c3;
      }

      if (!res.errbook) {
        this.today.revenueE = 0;
        this.today.timeE = 0;
        d4 = e5 = f6 = 0;
      } else {
        this.today.revenueE = (res.errbook.wechat ? res.errbook.wechat.money : 0) + (res.errbook.alipay ? res.errbook.alipay.money : 0) + (res.errbook.unionpay ? res.errbook.unionpay.money : 0);
        d4 = res.errbook.wechat ? res.errbook.wechat.count : 0;
        e5 = res.errbook.alipay ? res.errbook.alipay.count : 0;
        f6 = res.errbook.unionpay ? res.errbook.unionpay.count : 0;
        this.today.timeE = d4 + e5 + f6;
      }
      this.today.revenueC = Math.round(this.today.revenueC); // 四舍五入取整
      this.today.revenueE = Math.round(this.today.revenueE);
      this.today.totalM = this.today.revenueC + this.today.revenueE;
      this.today.totalT = this.today.timeC + this.today.timeE;
      this.today.alipay = b2 + e5;
      this.today.unionpay = c3 + f6;
      this.today.wechatpay = a1 + d4;
      if (this.today.revenueC == 0 || this.today.revenueE == 0) {
        this.revenue = this.todayPro.full([this.today.revenueC, this.today.revenueE]);
      } else {
        this.revenue = this.todayPro.eachday([this.today.revenueC, this.today.revenueE]);
      }

      if (this.today.timeC == 0 || this.today.timeE == 0) {
        this.time = this.todayPro.full([this.today.timeC, this.today.timeE]);
      } else {
        this.time = this.todayPro.eachday([this.today.timeC, this.today.timeE]);
      }

      this.method = this.todayPro.eachday([this.today.alipay, this.today.wechatpay, this.today.unionpay]);

      if (this.revenue && this.time && this.method) {
        this.state = true;
      }
      event && event.complete();
    }).catch(ex => exception(ex));
  }

  ionViewWillEnter() {
    this.switch = true;
    this.statusBar.backgroundColorByHexString('#fff');
  }
  ionViewWillLeave() {
    this.switch = false;
  }
}
