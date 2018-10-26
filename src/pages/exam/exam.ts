import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { SDATA_PAGE } from '../../pages/pages.constants';
/**
 * Generated class for the ExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {
  schoolList: any[];
  schoolsCache: any[];
  page = { index: 1, len: 20 };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePro: DataProvider
  ) { }



  ionViewDidLoad() {
    setTimeout(() => {
      this.datePro.institute({ ...this.navParams.get('req'), showType: this.navParams.get('type') }).then(res => {
        if (!res) return this.schoolsCache = null;
        this.schoolList = res;
        this.schoolsCache = res.slice(0, this.page.len);
      }).catch(ex => {
        this.schoolsCache = null;
      })
    }, 350)
  }

  doInfinite(event?) {
    this.page.index++;
    if (this.schoolList && this.schoolList.length) {
      this.schoolsCache = this.schoolList.slice(0, this.page.index * this.page.len);
    }
    event && event.complete();
  }

  goSdata(val) {
    this.navCtrl.push(SDATA_PAGE, {
      grade: '',
      gradeText: '全部',
      areaCode: this.navParams.get('req').areaCode,
      Name: val.Name,
      Guid: val.Guid,
      time: this.navParams.get('req').time,
      //区域
      areaText: this.navParams.get('region')
    })
  }
}
