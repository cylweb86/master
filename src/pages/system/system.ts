import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news'
import { SHEETS_PAGE, UNIONS_PAGE, HANDLES_PAGE, RELATIVES_PAGE, ARRANGES_PAGE } from '../pages.constants';
import { UserProvider } from '../../providers/user';
import { NativeProvider } from '../../providers/native';
/**
 * Generated class for the SystemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-system',
  templateUrl: 'system.html',
})
export class SystemPage {
  system: any;
  role: any;
  area: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsPro: NewsProvider,
    private userPro: UserProvider,
    private nativePro: NativeProvider
  ) { }

  ngAfterViewInit() {
    /**
     *  1	问题工单新回复  1
     *  2	联考工单新回复  2
     *  3	联考工单状态更新  2
     *  4	新的待审核联考工单 3 
     *  5	新的待审核约考工单 1
     *  6	新的待查看约考工单 2
     */
    let cache: any = this.navParams.data.isRead;
    if (cache == 0) {
      this.navParams.data.isRead = 1;
    }
    this.newsPro.system({ guid: this.navParams.get('guid') }).then(res => {
      if (!res) this.system = null;
      this.system = res;
      if (cache == 0) {
        this.newsPro.all();
      }
    }).catch(ex => this.system = null);
    this.userPro.getSelfInfo().then(res => {
      this.role = res.role || '';
      this.area = res.area || '';
    }).catch(ex => ex);
  }

  go() {
    if (this.system.type == 1) {
      this.navCtrl.push(SHEETS_PAGE);
    }
    if (this.system.type == 2 || this.system.type == 3) {
      this.navCtrl.push(UNIONS_PAGE);
    }
    if (this.system.type == 4) {
      this.navCtrl.push(HANDLES_PAGE);
    }
    if (this.system.type == 5) {
      if (this.role == '片区经理') {
        this.navCtrl.push(ARRANGES_PAGE, { citys: this.area, provinces: "", audited: true });
      } else if (this.role == '省区经理') {
        this.navCtrl.push(ARRANGES_PAGE, { provinces: this.area, citys: "", audited: false });
      } else {
        this.nativePro.toast('仅省区经理和片区经理可查看');
      }
    }
    if (this.system.type == 6) {
      if (this.role == '片区经理') {
        this.navCtrl.push(RELATIVES_PAGE, { citys: this.area, provinces: "" });
      } else if (this.role == '省区经理') {
        this.navCtrl.push(RELATIVES_PAGE, { provinces: this.area, citys: "" });
      } else {
        this.nativePro.toast('仅省区经理和片区经理可查看');
      }
    }
  }

}
