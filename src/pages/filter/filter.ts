import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, DateTime, AlertController } from 'ionic-angular';
import { FILTERMODAL_PAEG } from '../../pages/pages.constants';
import { DataProvider } from '../../providers/data/data';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user';
import { StatusBar } from '@ionic-native/status-bar';
import { localtime } from '../../utils/common';
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  @ViewChild('datetime1') datetime1: DateTime;
  @ViewChild('datetime2') datetime2: DateTime;
  @ViewChild('datetime3') datetime3: DateTime;
  @ViewChild('datetime4') datetime4: DateTime;
  simpleColumns: any[] = [];
  public event = {
    maxM: '',
    max: '',
    timeQ: '',
    timeM: '',
    timeD: '',
    time: '',
    timey: ''
  }
  cache: any;
  areaCode: string;
  gradeCode: string;
  area: string;
  grade: string;
  come: boolean = true;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private datePro: DataProvider,
    private messagepro: MessageProvider,
    private alertCtrl: AlertController,
    private userPro: UserProvider,
    private statusBar: StatusBar
  ) {
    let ly: string = localtime('y');
    let arr: any[] = [];
    for (let i = 2017; i <= Number(ly); i++) {
      arr.push({ text: String(i), value: String(i) });
    }
    this.simpleColumns = [{ options: arr }, { options: [{ text: '上半年', value: '上半年' }, { text: '下半年', value: '下半年' }] }];
  }

  picker(event) {
    let open = () => {
      let model = this.modalCtrl.create(FILTERMODAL_PAEG, { region: event });
      model.present();
      model.onDidDismiss(res => {
        if (res.value == undefined && res.close) return;
        if (!res.text && res.value == undefined && res.all) {
          if (res.differ == 'area') {
            this.area = '全部';
            this.areaCode = '';
          } else {
            this.grade = '全部';
            this.gradeCode = '';
          }
          return;
        }
        if (res.differ == 'area') {
          this.area = res.text
          this.areaCode = res.value;
        } else {
          this.grade = res.text;
          // value: "G1"
          let Y: number = new Date().getFullYear();
          let M: number = new Date().getMonth() + 1;
          if (res.value.length == 2 && M >= 8) {
            this.gradeCode = Y - Number(res.value[1]) + 1 + res.value[0];
          } else if (res.value.length == 2 && M < 8) {
            this.gradeCode = Y - Number(res.value[1]) + res.value[0];
          } else {
            this.gradeCode = res.value;
          }
        }
      })
    }
    open();
  }



  restart() {
    this.area = this.cache.area;
    this.grade = this.cache.grade;
    this.event.time = this.cache.time;
    this.areaCode = this.cache.code;
    this.gradeCode = '';
  }

  open() {
    let prompt = this.alertCtrl.create({
      title: '选择时间',
      cssClass: 'timePicker',
      inputs: [
        {
          type: 'radio',
          label: '按季度选择',
          handler: () => {
            setTimeout(() => {
              prompt.dismiss();
              this.datetime1.open();
            }, 300)
          }
        },
        {
          type: 'radio',
          label: '按月份选择',
          handler: () => {
            setTimeout(() => {
              prompt.dismiss();
              this.datetime2.open();
            }, 300)
          }
        },
        {
          type: 'radio',
          label: '按日期选择',
          handler: () => {
            setTimeout(() => {
              prompt.dismiss();
              this.datetime3.open();
            }, 300)
          }
        },
        {
          type: 'radio',
          label: '按半年选择',
          handler: () => {
            setTimeout(() => {
              prompt.dismiss();
              this.datetime4.open();
            }, 300)
          }
        }
      ]
    });
    prompt.present();
  }

  QC() {
    this.event.time = this.event.timeQ.slice(0, 4) + '-' + this.event.timeQ.slice(6);
  }

  MC() {
    this.event.time = this.event.timeM;
  }

  DC() {
    this.event.time = this.event.timeD;
  }

  YC() {
    this.event.time = this.event.timey;
  }

  ngAfterViewInit() {
    this.area = this.navParams.data.areaText;
    this.grade = this.navParams.data.gradeText;
    this.areaCode = this.navParams.get('param').areaCode;
    let time = this.navParams.get('param').time;
    this.gradeCode = this.navParams.get('param').grade;
    if (time.length == 8) {
      time = time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6);
    } else {
      time = time.slice(0, 4) + '-' + time.slice(4)
    }
    this.event.time = time;


    //昨天
    let lastDate: any = new Date();
    lastDate.setTime(lastDate.getTime() - 24 * 60 * 60 * 1000);
    let M = lastDate.getMonth() + 1;
    let lastM: string | number = M < 10 ? '0' + M : M;
    let D = lastDate.getDate();
    let lastD: number | string = D < 10 ? '0' + D : D;
    let Y = lastDate.getFullYear();
    this.event.max = Y + '-' + lastM + '-' + lastD;

    // 本月
    let month = new Date().getMonth() + 1;
    let trueM = month < 10 ? '0' + month.toString() : month;
    this.event.maxM = new Date().getFullYear() + '-' + trueM;

    //获取重置的初始值
    this.userPro.getMaxArea().then(res => {
      // 201209
      let initT = res.time.slice(0, 4) + '-' + res.time.slice(4);
      this.cache = { area: res.value, grade: '全部', time: initT, code: res.code };
    }).catch(ex => ex)
  }

  comfire() {
    if (!this.navParams.get('type')) {
      this.messagepro.sendMessage({ area: this.areaCode, grade: this.gradeCode, time: this.event.time, gradeText: this.grade, areaText: this.area });
    } else {
      this.datePro.send({ grade: this.gradeCode, time: this.event.time, gradeText: this.grade });
    }

    this.navCtrl.pop();
  }


  ionViewWillLeave() {
    this.come = false;
  }

  ionViewWillEnter() {
    this.come = true;
    this.statusBar.backgroundColorByHexString('#fff');
  }

}
