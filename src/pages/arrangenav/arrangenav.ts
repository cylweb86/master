import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { NativeProvider } from '../../providers/native'
import { ARRANGES_PAGE, RELATIVES_PAGE } from '../../pages/pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the ArrangenavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arrangenav',
  templateUrl: 'arrangenav.html',
})
export class ArrangenavPage {
  area: string;
  role: string;
  right: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataPro: DataProvider,
    private nativePro: NativeProvider,
    private statusBar: StatusBar
  ) { }

  ngAfterViewInit() {
    this.dataPro.userinfo().then(res => {
      if (!res) return this.right = null;
      this.right = res;
      this.role = res.Role;
      if (res.Area) {
        this.area = res.Area.join();
      }
    }).catch(ex => {
      this.right = null;
    })
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
  }
  
  goInitiate() {
    if (this.role == '片区经理') {
      this.navCtrl.push(ARRANGES_PAGE, { citys: this.area, provinces: "", audited: true });
    } else if (this.role == '省区经理') {
      this.navCtrl.push(ARRANGES_PAGE, { provinces: this.area, citys: "", audited: false });
    } else {
      this.nativePro.toast('仅省区经理和片区经理可查看');
    }
  }

  goRelevant() {
    if (this.role == '片区经理') {
      this.navCtrl.push(RELATIVES_PAGE, { citys: this.area, provinces: "" });
    } else if (this.role == '省区经理') {
      this.navCtrl.push(RELATIVES_PAGE, { provinces: this.area, citys: "" });
    } else {
      this.nativePro.toast('仅省区经理和片区经理可查看');
    }
  }

}
