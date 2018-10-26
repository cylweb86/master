import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SDATA_PAGE } from '../../pages/pages.constants';
import { DataProvider } from '../../providers/data/data';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the SchoolsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schools',
  templateUrl: 'schools.html',
})
export class SchoolsPage {
  params: any;
  db: string;
  schoolsCache: School[];
  tempSchools: School[];
  checked: School;
  input: string;
  oldSearch: string;
  page = { index: 1, len: 30 };


  init: School[];
  switch: boolean = false;
  count: number = 0;

  opt: any;
  isshow: boolean = true;
  pages: any = {
    sdata: SDATA_PAGE
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataPro: DataProvider,
    private statusBar: StatusBar
  ) { }


  ionViewDidLoad() {
    setTimeout(() => {
      this.opt = this.navParams.data;
      this.dataPro.institute(this.opt.param).then(res => {
        if (!res || !res.length) {
          this.db = this.schoolsCache = this.tempSchools = null;
          return;
        }
        this.db = JSON.stringify(res.map(item => { return Object.assign(item, { cache: item.Name, priority: 0 }) }));
        this.schools = JSON.parse(this.db);
        this.count = res.length;
        this.init = JSON.parse(this.db);
      }).catch(err => {
        this.db = this.schoolsCache = this.tempSchools = null;
      });
    }, 350)
  }

  onInput(event) {
    if (this.input == this.oldSearch) return;
    let tempList: [School] = JSON.parse(this.db);
    for (let i = 0; i < this.input.length; i++) {
      let w = this.input.substr(i, 1),
        len = tempList.length;
      for (let j = 0; j < len; j++) {
        let item = tempList[j],
          index = item.cache.indexOf(w);
        if (index < 0) {
          tempList.splice(j, 1);
          j--;
          len--;
        } else {
          item.priority += item.cache.substring(0, index).length; //匹配度权重
          item.cache = item.cache.substring(index); //匹配值
        }
      }
    }
    this.oldSearch = this.input;
    this.schools = tempList.length ? tempList.sort((a, b) => {
      return (a.priority - b.priority) || (a.Name.length - b.Name.length);
    }) : null;
  }

  doInfinite(event?) {
    if (this.schoolsCache && this.schoolsCache.length) {
      this.tempSchools = this.schoolsCache.slice(0, this.page.index * this.page.len);
      this.page.index++;
    } else {
      this.tempSchools = null;
    }
    event && event.complete();
  }

  set schools(schools: School[]) {
    this.schoolsCache = schools;
    this.page.index = 1;
    this.doInfinite();
  }

  cancel() {
    this.switch = !this.switch;
    this.schools = this.init;
  }


  goSdata(val) {
    // console.log(val, 'val');
    this.navCtrl.push(SDATA_PAGE, {
      ...val,
      areaText: this.opt.areaText,
      areaCode: this.opt.param.areaCode,
      time: this.opt.param.time,
      grade: '',
      gradeText: '全部'
    })
  }



  ionViewWillLeave() {
    this.isshow = false;
  }

  ionViewWillEnter() {
    this.isshow = true;
    this.statusBar.backgroundColorByHexString('#fff');
  }


}
export interface School {
  RU: string,
  Name: string,
  Guid: string;
  UnionExam: number;
  SmallExam: number;
  SchoolExam: number;
  cache: string;
  priority: number;
}