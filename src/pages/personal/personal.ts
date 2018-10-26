import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  userInfo: any;
  area: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataPro: DataProvider
  ) { }
  /**
      [
          ["安徽省","合肥市","肥西县"],
          ["安徽省","蚌埠市"],
          ["安徽省"]
      ]
        安徽省合肥市肥西县 安徽省蚌埠市 安徽省

      area:"340100,340200,340500",areaName:"安徽省合肥市、安徽省芜湖市、安徽省马鞍山市",
      name:"程学强",
      phone:"13966924259",
      role:"片区经理"
   */

  ngAfterViewInit() {
    this.dataPro.userinfo().then(res => {
      if (!res) return this.userInfo = null;
      setTimeout(() => this.userInfo = res, 100);
      let arr = [];
      if (res.AreaName) {
        res.AreaName.forEach(v => {
          arr.push(v.join(''));
        })
        if (arr.length == 1) {
          this.area = arr.toString().trim();
        } else {
          this.area = arr.join('、');
        }
      }
    }).catch(ex => this.userInfo = null)
  }
}
