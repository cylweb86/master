import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';
import { DataProvider } from '../../providers/data/data';
import { StatusBar } from '@ionic-native/status-bar';
import { localtime } from '../../utils/common';
import { ChartProvider } from '../../providers/chart/chart';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the TrendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html',
})
export class TrendPage {
  time: string = 'm';
  basics: string;
  extend: string = 'NewBindUser';
  switch: boolean = false;
  all: perval[][] = [];
  qall: perval[][] = [];
  data: any;
  qdata: any;
  mdata: any;
  myChart: any;
  temporary: ca;
  arr: any[] = [];
  headline: boolean = true;
  @ViewChild('btn') btn: ElementRef;
  @ViewChild('mix') mix: ElementRef;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private r2: Renderer2,
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
    this.dataPro.trend({ ...this.navParams.data, start: init.start, end: localtime(init.time) }).then(res => {
      if (!res || !Object.keys(res).length) return this.data = null;
      this.headline = false;
      this.data = res;
      let k: any = Object.keys(this.data);
      for (let i = 0; i < k.length; i++) {
        if (this.data[k[i]].ItemList) {
          c[i] = this.data[k[i]].ItemList.filter(v => v.Type == "M0");
          if (!c[i].length) {
            c[i] = [{
              Money: 0
            }]
          }
        } else {
          c[i] = [{
            Money: 0
          }]
        }
        this.data[k[i]].checkRate = (!this.data[k[i]].ExamStudentCount || !this.data[k[i]].ViewStudentUV) ? 0 : (this.data[k[i]].ViewStudentUV / this.data[k[i]].ExamStudentCount);
        this.data[k[i]].perPage = (!this.data[k[i]].ResponseCount || !c[i][0].Money) ? 0 : (c[i][0].Money / this.data[k[i]].ResponseCount);
        this.data[k[i]].payRate = (!this.data[k[i]].ViewStudentUV || !this.data[k[i]].PayedUser) ? 0 : (this.data[k[i]].PayedUser / this.data[k[i]].ViewStudentUV);
        this.data[k[i]].perExam = (!this.data[k[i]].ExamStudentCount || !c[i][0].Money) ? 0 : (c[i][0].Money / this.data[k[i]].ExamStudentCount);
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
      let cache: any[] = [];
      for (let i = 0; i < keys.length; i++) {
        let rate: any;
        if (i == 0 || !this.data[keys[i - 1]][param]) {
          rate = '无';
        } else {
          let p: any = ((this.data[keys[i]][param] || 0) - this.data[keys[i - 1]][param]) / this.data[keys[i - 1]][param];
          rate = (100 * p).toFixed(2) + '%';
        }
        if (param == 'checkRate' || param == 'perPage' || param == 'payRate' || param == 'perExam') {
          cache.push({ rate, value: (100 * this.data[keys[i]][param]).toFixed(1), small: true });
        } else {
          cache.push({ rate, value: this.data[keys[i]][param] || 0 });
        }
      }
      type == 'm' ? this.all[index] = cache : this.qall[index] = cache;
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
      this.request({ time: event.value, id: this.temporary.index, val: this.temporary.value, start: '20171' });
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
    if (event.value == this.extend) {
      this.switch = !this.switch;
    } else {
      let el = this.btn.nativeElement;
      this.switch = false;
      this.r2.removeClass(el, 'checked');
    }
    let index: number = this.arr.findIndex(v => v == event.value);
    this.temporary.index = index;
    this.temporary.value = event.value;
    if (this.time == 'm') {
      this.data = this.mdata;
      !this.all[index] ? this.info(index, event.value, this.time) : this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), this.all[index]));
    } else {
      this.data = this.qdata;
      !this.qall[index] ? this.info(index, event.value, this.time) : this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), this.qall[index]));
    }
  }

  chthree(event) {
    setTimeout(() => {
      this.switch = false;
    }, 20)
    let index: number = this.arr.findIndex(v => v == event.value);
    this.temporary.index = index;
    this.temporary.value = event.value;
    if (this.time == 'm') {
      this.data = this.mdata;
      !this.all[index] ? this.info(index, event.value, this.time) : this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), this.all[index]));
    } else {
      this.data = this.qdata;
      !this.qall[index] ? this.info(index, event.value, this.time) : this.myChart.setOption(this.chartPro.lineChart(Object.keys(this.data), this.qall[index]));
    }
  }

  ngAfterViewInit() {
    this.arr = ['PayedUser', 'PackageUser', 'ViewPV', 'ViewStudentUV', 'BindUser', 'perExam', 'perPage', 'checkRate', 'payRate', 'ViewFreeStudentUV', 'ViewPayStudentUV', 'ViewFreePV', 'ViewPayPV', 'BindStudent', 'NewBindStudent', 'NewBindUser'];
    let id: number = this.arr.findIndex(v => v == this.navParams.get('type'));
    if (id > 4) {
      this.extend = this.arr[id];
      setTimeout(() => {
        this.basics = this.arr[id];
      }, 50)
    } else {
      this.basics = this.arr[id];
    }
    this.temporary = {
      index: id,
      value: this.arr[id]
    }
    this.request({ time: 'm', id, val: this.arr[id], start: '201701' });
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