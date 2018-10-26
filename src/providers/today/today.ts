import { Injectable } from '@angular/core';
import { HttpProvider } from '../http';
/*
  Generated class for the TodayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodayProvider {
  constructor(
    private httpPro: HttpProvider
  ) { }

  eachday(echartData) {
    return {
      backgroundColor: '#fff',
      series: [{
        name: 'pie',
        type: 'pie',
        radius: ['35%', '50%'],
        hoverAnimation: false,
        color: ['#61bafd', '#7881fa', '#ff68b9'],
        label: {
          formatter: function (params) {
            let total: number = 0;
            let percent: any;
            echartData.forEach((val, index) => {
              total += val;
            })
            percent = ((params.value / total) * 100).toFixed(1);
            return Number(percent) ? `${percent}%` : '';
          },
          padding: [0, 0]
        },
        labelLine: {
          show: false,
          length: 0,
          length2: 5
        },
        data: echartData
      }]
    };
  }

  full(echartData) {
    return {
      backgroundColor: '#fff',
      series: [{
        name: 'pie',
        type: 'pie',
        radius: ['35%', '50%'],
        hoverAnimation: false,
        color: ['#61bafd', '#7881fa', '#ff68b9'],
        label: {
          formatter: function (params) {
            let total: number = 0;
            let percent: any;
            echartData.forEach((val, index) => {
              total += val;
            })
            percent = ((params.value / total) * 100).toFixed(1);
            return Number(percent) ? `${percent}%` : '';
          },
          position: 'center',
          padding: [8, 0, 0, 0]
        },
        labelLine: {
          show: false,
          length: 0,
          length2: 5
        },
        data: echartData
      }]
    };
  }

  todayinfo() {
    return this.httpPro.post('data/todayorder');
  }
}
