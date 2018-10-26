import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TREND_PAGE } from '../pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the DataoperatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dataoperate',
  templateUrl: 'dataoperate.html',
})
export class DataoperatePage {
  pages: any = {
    trend: TREND_PAGE
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private alerCtrl: AlertController
  ) { }
  ionViewWillEnter() {
    this.statusBar.show();
    this.screenOrientation.unlock();
    setTimeout(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }, 100);
    this.statusBar.backgroundColorByHexString('#fff');
  }
  goTrend(type) {
    if (this.navParams.get('req').schoolGuid) {
      this.navCtrl.push(TREND_PAGE, {
        areaCode: this.navParams.get('req').areaCode,
        grade: this.navParams.get('req').grade,
        type,
        schoolGuid: this.navParams.get('req').schoolGuid,
        cansee: this.navParams.get('cansee')
      })
    } else {
      this.navCtrl.push(TREND_PAGE, {
        areaCode: this.navParams.get('req').areaCode,
        grade: this.navParams.get('req').grade,
        type,
        cansee: this.navParams.get('cansee')
      })
    }
  }

  help() {
    let notice = this.alerCtrl.create({
      cssClass: 'trendmsg',
      title: '运营数据说明',
      message: `
         <p>1、新增注册用户数：选择时间段内，新增的注册用户数</p>
         <p>2、累计注册用户数：截止至选择时间，累计注册用户数</p>
         <p>3、新增绑定学生数：选择时间段内，新增的绑定学生数</p>
         <p>4、累计绑定学生数：截止至选择时间，累计注册用户数</p>
         <p>5、付费用户数：选择时间段内，付费的用户数</p>
         <p>6、套餐用户数：截止至选择时间，目前套餐在服务（不含已过期）的用户数</p>
         <p>7、查分访问量(PV)：选择时间段内，总的查分（付费查分、免费查分）访问量</p>
         <p>8、付费查分访问量：选择时间段内，总的付费查分访问量</p>
         <p>9、免费查分访问量：选择时间段内，总的免费查分访问量</p>
         <p>10、查分学生数（UV）：选择时间段内，总的查分（付费查分、免费查分）访问学生数</p>
         <p>11、付费查分学生数：选择时间段内，总的查分付费查分访问学生数</p>
         <p>12、免费查分学生数：选择时间段内，总的查分免费查分访问学生数</p>
         <p>13、查分率：使用（查分学生数/考生数）得来的数据</p>
         <p>14、缴费率：使用（付费用户数/查分学生数）得来的数据</p>
      `
    })
    notice.present();
  }
}

