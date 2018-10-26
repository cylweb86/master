import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SHEETNAV_PAGE, DATA_PAGE, ARRANGENAV_PAGE } from '../pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  shadow = {
    first: false,
    second: false,
    isshow: true,
    third: false
  }
  height: any;
  constructor(
    public navCtrl: NavController,
    private statusBar: StatusBar
  ) { }

  goSheets() {
    this.shadow.first = true;
    this.navCtrl.push(SHEETNAV_PAGE);
  }
  goData() {
    this.shadow.second = true;
    this.navCtrl.push(DATA_PAGE);
  }
  goArrange() {
    this.shadow.third = true;
    this.navCtrl.push(ARRANGENAV_PAGE);
  }

  ngAfterViewInit() {
    this.height = (document.documentElement.clientWidth - 32) * 0.48;
  }
  ionViewWillEnter() {
    this.shadow = {
      first: false,
      second: false,
      isshow: true,
      third: false
    }
    this.statusBar.backgroundColorByHexString('#1F9DF8');
  }
  ionViewWillLeave() {
    this.shadow.isshow = false;
  }
}