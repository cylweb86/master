import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SHEETS_PAGE, UNIONS_PAGE, HANDLES_PAGE } from '../pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeProvider } from '../../providers/native';
import { HttpProvider } from "../../providers/http";
/**
 * Generated class for the SheetnavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sheetnav',
  templateUrl: 'sheetnav.html',
})
export class SheetnavPage {
  right: Right;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusBar: StatusBar,
    private nativePro: NativeProvider,
    private httpPro: HttpProvider
  ) { }
  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
  }
  ngAfterViewInit() {
    this.httpPro.post('Business_Menu').then(res => {
      if (!res) return this.right = null;
      this.right = res;
    }).catch(ex => {
      this.right = null;
      if (ex && ex.message) {
        this.nativePro.toast(ex.message);
      }
    });
  }

  goProblem() {
    if (!this.right.problem) return this.nativePro.toast('仅片区经理及以上可提交');
    this.navCtrl.push(SHEETS_PAGE);
  }

  goUnion() {
    if (!this.right.union) return this.nativePro.toast('仅片区经理可提交');
    this.navCtrl.push(UNIONS_PAGE);
  }

  goHandle() {
    if (!this.right.handle) return this.nativePro.toast('仅省区经理及以上可处理');
    this.navCtrl.push(HANDLES_PAGE);
  }
}


interface Right {
  problem: boolean,
  union: boolean,
  handle: boolean
}