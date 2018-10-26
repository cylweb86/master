import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';
import { DataProvider } from '../../providers/data/data';
import { StatusBar } from '@ionic-native/status-bar';
import { localtime } from '../../utils/common';
import { ChartProvider } from '../../providers/chart/chart';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the RevenuetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-revenuet',
  templateUrl: 'revenuet.html',
})
export class RevenuetPage {
  time: string = 'm';
  basics: string;
  all: perval[][] = [];
  qall: perval[][] = [];
  data: any;
  qdata: any;
  mdata: any;
  myChart: any;
  temporary: ca;
  arr: any[] = [];
  headline: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataPro: DataProvider,
    private statusBar: StatusBar,
    private chartPro: ChartProvider,
    private screenOrientation: ScreenOrientation
  ) { }

  ionViewWillLeave() {
    this.headline = false;
  }
  ionViewWillEnter() {
    this.statusBar.hide();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  request(init) {
    this.data = undefined;
    let c: any[] = [];
    let e: any[] = [];
    //let f: any[] = [];
    this.dataPro.trend({ ...this.navParams.data, start: init.start, end: init.end }).then(res => {
      if (!res || !Object.keys(res).length) return this.data = null;
      this.headline = false;
      this.data = res;
      let k: any = Object.keys(this.data);
      for (let i = 0; i < k.length; i++) {
        if (!this.data[k[i]].ItemList) {
          this.data[k[i]].learn = this.data[k[i]].err = this.data[k[i]].total = this.data[k[i]].video = 0;
        } else {
          c[i] = this.data[k[i]].ItemList.filter(v => v.Type == "M0" || v.Type == "M5" || v.Type == "M6");
          if (c[i].length) {
            let study: number = 0;
            c[i].forEach(v => {
              study += v.Money;
            })
            this.data[k[i]].learn = study.toFixed(2);
          } else {
            this.data[k[i]].learn = 0;
          }

          e[i] = this.data[k[i]].ItemList.filter(v => v.Type == "M1" || v.Type == "M3" || v.Type == "M4");
          if (e[i].length) {
            let errbook: number = 0;
            e[i].forEach(v => {
              errbook += v.Money;
            })
            this.data[k[i]].err = errbook.toFixed(2);
          } else {
            this.data[k[i]].err = 0;
          }

          // f[i] = this.data[k[i]].ItemList.filter(v => v.Type == "M7" || v.Type == "M8");
          // if (f[i].length) {
          //   let mv: number = 0;
          //   f[i].forEach(v => {
          //     mv += v.Money;
          //   })
          //   this.data[k[i]].video = mv.toFixed(2);
          // } else {
          //   this.data[k[i]].video = 0;
          // }

          // this.data[k[i]].total = (Number(this.data[k[i]].err) + Number(this.data[k[i]].learn) + Number(this.data[k[i]].video)).toFixed(2);
          this.data[k[i]].total = (Number(this.data[k[i]].err) + Number(this.data[k[i]].learn)).toFixed(2);
        }
      }
      this[init.time + 'data'] = this.data;
      setTimeout(() => {
        this.info(init.id, init.val, init.time, true);
      }, 350);
    }).catch(ex => this.data = null);
  }

  info(index, param, type, chartinit?) {
    if (this.data) {
      let keys: any = Object.keys(this.data);
      let data: any[] = [];
      //付费用户数,前一个值不能为0,前一个值是分母
      for (let i = 0; i < keys.length; i++) {
        let rate: any;
        if (i == 0 || !Number(this.data[keys[i - 1]][param])) {
          rate = '无';
        } else {
          let p: any = ((Number(this.data[keys[i]][param]) || 0) - Number(this.data[keys[i - 1]][param])) / Number(this.data[keys[i - 1]][param]);
          rate = (100 * p).toFixed(2) + '%';
        }
        data.push({ rate, value: this.data[keys[i]][param] || 0 });
      }
      type == 'm' ? this.all[index] = data : this.qall[index] = data;
      if (chartinit) {
        let W = document.documentElement.clientWidth;
        let H = Math.max(document.body.scrollHeight, document.documentElement.clientHeight, document.body.clientHeight);
        document.getElementById('chart').style.width = W + 'px';
        document.getElementById('chart').style.height = .8 * H + 'px';
        const ec = echarts as any;
        this.myChart = ec.init(document.getElementById('chart'));
      }
      this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), type == 'm' ? this.all[index] : this.qall[index]));
    }

  }

  changed(event) {
    if (event.value == 'q' && this.qdata) {
      if (this.qall[this.temporary.index]) {
        this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.qdata), this.qall[this.temporary.index]));
      } else {
        this.data = this.qdata;
        this.info(this.temporary.index, this.temporary.value, this.time);
      }
    } else if (event.value == 'q' && !this.qdata) {
      this.request({ time: event.value, id: this.temporary.index, val: this.temporary.value, start: '20171', end: localtime(event.value) });
    }

    if (event.value == 'm') {
      if (this.all[this.temporary.index]) {
        this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.mdata), this.all[this.temporary.index]));
      } else {
        this.data = this.mdata;
        this.info(this.temporary.index, this.temporary.value, this.time);
      }
    }
  }

  chtwo(event) {
    let index: number = this.arr.findIndex(v => v == event.value);
    this.temporary.index = index;
    this.temporary.value = event.value;
    if (this.time == 'm') {
      this.data = this.mdata;
      !this.all[index] ? this.info(index, event.value, this.time) : this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), this.all[index]));
    } else if (this.time == 'q') {
      this.data = this.qdata;
      !this.qall[index] ? this.info(index, event.value, this.time) : this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), this.qall[index]));
    }
  }



  ngAfterViewInit() {
    this.arr = ['total', 'learn', 'err', 'video'];
    let id: number = this.arr.findIndex(v => v == this.navParams.get('type'));
    this.basics = this.arr[id];
    this.temporary = {
      index: id,
      value: this.arr[id]
    }
    this.request({ time: 'm', id, val: this.arr[id], start: '201701', end: localtime('m') });
  }
}

export interface perval {
  rate: any;
  value: any
}

export interface ca {
  index: number;
  value: any;
}