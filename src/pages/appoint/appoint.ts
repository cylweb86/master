import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArrangeProvider } from '../../providers/arrange/arrange';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the AppointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appoint',
  templateUrl: 'appoint.html',
})
export class AppointPage {
  aschool: any;
  course: string;
  switch: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private arrangePro: ArrangeProvider,
    private statusBar: StatusBar
  ) { }

  ionViewDidLoad() {
    setTimeout(() => this.init(), 100);
  }
  
  init() {
    this.arrangePro.aschool({ id: this.navParams.get('guid') }).then(res => {
      if (!res) return this.aschool = null;
      if (!this.switch) {
        let reg: RegExp = new RegExp("[\u4e00-\u9fa5]");
        if (!reg.test(res.examName)) this.switch = true;
      }
      let arr = JSON.parse(res.kms).map(v => v.name);
      this.course = arr.join();
      if (this.course) {
        this.aschool = res;
      }
    }).catch(ex => this.aschool = null)
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#2EB6EE');
  }

}
