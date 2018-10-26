import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EXAM_PAGE } from '../../pages/pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
import { TESTREND_PAGE } from '../../pages/pages.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the DatatestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datatest',
  templateUrl: 'datatest.html',
})
export class DatatestPage {
  pages: any = {
    exam: EXAM_PAGE
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
  gotrend(type) {
    this.navCtrl.push(TESTREND_PAGE, {
      areaCode: this.navParams.get('req').areaCode,
      grade: this.navParams.get('req').grade,
      type
    })
  }

  help() {
    let notice = this.alerCtrl.create({
      cssClass: 'trendmsg',
      title: '考试数据说明',
      message: `
         <p>1、小考次数：学校举办的单科目考试的次数，如数学周测、语文周测等</p>
         <p>2、校考次数：学校举办的多科目考试的次数，如政史地周测、期末考试等</p>
         <p>3、联考次数：多校联合举办的考试次数</p>
         <p>4、考试人次：选择时间段内，每场考试学生人次叠加</p>
         <p>5、考生数： 有成绩有答卷的学生数，按发布成绩时间开始计数</p>
         <p>6、答卷数：区域内考试，产生的答卷数</p>
         <p>7、有考试学校数：区域内有考试（包含小考、校考、联考）的学校数</p>
         <p>8、有校考学校数：区域内有校考的学校数</p>
      `
    })
    notice.present();
  }
}
