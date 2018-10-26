import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { REVENUET_PAGE } from '../../pages/pages.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the DatarevenuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datarevenue',
  templateUrl: 'datarevenue.html',
})
export class DatarevenuePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation
  ) { }

  ionViewWillEnter() {
    this.statusBar.show();
    this.screenOrientation.unlock();
    setTimeout(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }, 100);
    this.statusBar.backgroundColorByHexString('#1F9DF8');
  }
  gort(type) {
    if (this.navParams.get('req').schoolGuid) {
      this.navCtrl.push(REVENUET_PAGE, {
        areaCode: this.navParams.get('req').areaCode,
        grade: this.navParams.get('req').grade,
        type,
        schoolGuid: this.navParams.get('req').schoolGuid
      })
    } else {
      this.navCtrl.push(REVENUET_PAGE, {
        areaCode: this.navParams.get('req').areaCode,
        grade: this.navParams.get('req').grade,
        type
      })
    }
  }
}
