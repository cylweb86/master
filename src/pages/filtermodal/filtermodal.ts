import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user';
/**
 * Generated class for the FiltermodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtermodal',
  templateUrl: 'filtermodal.html',
})
export class FiltermodalPage {
  data: any[] = [];

  views: any;

  tabActiveIndex = 0;

  tabs: number[] = [];

  options: any;

  differ: string;

  suffix: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private userPro: UserProvider
  ) { }



  getViewData() {
    let temp: any = this.data,
      value, name: string[] = [];
    for (let i = 0; i < this.tabActiveIndex; i++) {
      temp[this.tabs[i]].child && name.push(temp[this.tabs[i]].text);
      value = temp[this.tabs[i]].value;
      temp = temp[this.tabs[i]].child;
    }

    return { value: value, items: temp, text: name, differ: this.differ };
  }

  itemsClick(index) {
    this.tabs[this.tabActiveIndex] = index;
    if (this.tabActiveIndex === this.views.length - 1) {
      this.options.text.push(this.options.items[index].text)
      this.options = { value: this.options.items[index].value, text: this.options.text };
      return this.dissmiss(this.options);
    };

    this.tabActiveIndex++;
    this.options = this.getViewData();
    if (!this.options.items || !this.options.items.length) {
      this.tabs.length = this.tabActiveIndex;
      this.tabActiveIndex--;
      this.dissmiss(this.options)
    }
  }


  tabsClick(index = 0) {
    this.tabActiveIndex = index;
    this.options = this.getViewData();
  }

  dissmiss(item) {
    this.viewCtrl.dismiss({ value: item.value, text: this.suffix + item.text.join(' '), differ: this.differ });
  }



  ionViewDidLoad() {
    let gradeTabs: any = ['学段选择', '年级选择'];
    let areaTabs: any = ['部区选择', '省份选择', '城市选择', '区域选择'];
    let grade: any = [
      {
        "text": "高中",
        "value": "G",
        "child": [
          {
            "text": "一年级",
            "value": "G1",
            "child": []
          },
          {
            "text": "二年级",
            "value": "G2",
            "child": []
          },
          {
            "text": "三年级",
            "value": "G3",
            "child": []
          }]
      },
      {
        "text": "初中",
        "value": "C",
        "child": [
          {
            "text": "一年级",
            "value": "C1",
            "child": []
          },
          {
            "text": "二年级",
            "value": "C2",
            "child": []
          },
          {
            "text": "三年级",
            "value": "C3",
            "child": []
          }]
      },
      {
        "text": "小学",
        "value": "X",
        "child": [
          {
            "text": "一年级",
            "value": "X1",
            "child": []
          },
          {
            "text": "二年级",
            "value": "X2",
            "child": []
          },
          {
            "text": "三年级",
            "value": "X3",
            "child": []
          },
          {
            "text": "四年级",
            "value": "X4",
            "child": []
          },
          {
            "text": "五年级",
            "value": "X5",
            "child": []
          },
          {
            "text": "六年级",
            "value": "X6",
            "child": []
          }]
      }]



    let region = this.navParams.get('region');
    if (region == 'grade') {
      this.differ = 'grade';
      this.views = gradeTabs;
      this.data = grade;
      this.tabsClick();
    } else {
      this.differ = 'area';
      this.userPro.getMaxArea().then(res => {
        this.data = res.child;
        if (res.value != '全部') {
          this.suffix = res.value + ' ';
          let arr = res.value.split(' ');
          this.views = areaTabs.filter((v, i) => i >= arr.length);
        } else {
          this.views = areaTabs;
        }
        this.tabsClick();
      })
    }
    /**
     * 高一 2017G
     */
  }



}
