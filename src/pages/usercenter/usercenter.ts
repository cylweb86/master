import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PASSWORD_PAGE, SETUP_PAGE, PERSONAL_PAGE } from '../pages.constants'
import { UserProvider } from '../../providers/user';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the UsercenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usercenter',
  templateUrl: 'usercenter.html',
})
export class UsercenterPage {
  pages = {
    password: PASSWORD_PAGE,
    setup: SETUP_PAGE,
    personal: PERSONAL_PAGE
  };
  name: any;
  phone: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userPro: UserProvider,
    private statusBar: StatusBar
  ) { }

  ngAfterViewInit() {
    // this.userPro.getLogin().then(res => {
    //   if (!res || !res.usercode) return;
    //   this.phone = res.usercode;
    // });

    // this.userPro.getUserInfo().then(res => {
    //   if (!res || !res.name) return;
    //   this.name = res.name;
    // })
    this.userPro.getSelfInfo().then(res => {
      this.phone = res.phone || '暂无';
      this.name = res.name || '暂无';
    }).catch(ex => ex);
  }
  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
  }
}
