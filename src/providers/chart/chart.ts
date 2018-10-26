import { Injectable } from '@angular/core';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {
  constructor() { }

  lineChart(key, data) {
    return {
      backgroundColor: "#fff",
      color: ["#37A2DA"],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        interval: 16,
        data: key,
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          intervalue: 0,
          formatter: function (value) {
            return value.slice(0, 4) + "\n" + value.substring(4);
          },
          color: '#999'
        },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        x: 'center',
        type: 'value',
        show: false
      },
      dataZoom: [
        {
          type: 'inside',
          start: 70,
          end: 100,
          zoomLock: true
        }
      ],
      series: [{
        type: 'line',
        symbolSize: 5,
        data: data,
        label: {
          show: true,
          position: 'top',
          distance: 6,
          align: 'center',
          formatter: function (params) {
            let val = params.data.value;
            let rateNum = Number(params.data.rate.replace('%', ''));
            let litter = `${val}%\n(${params.data.rate})`;
            let main = `${val}\n(${params.data.rate})`;
            if (params.data.small && rateNum < 0) {
              return '{m|' + litter + '}';
            } else if (params.data.small && (rateNum >= 0 || params.data.rate == '无')) {
              return '{p|' + litter + '}';
            }
            if (!params.data.small && rateNum < 0) {
              return '{m|' + main + '}';
            } else if (!params.data.small && (rateNum >= 0 || params.data.rate == '无')) {
              return '{p|' + main + '}';
            }
          },
          rich: {
            p: {
              color: '#f31919'
            },
            m: {
              color: '#12cc9e'
            }
          },
          backgroundColor: {
            image: 'assets/images/textbg.png'
          },
          padding: 10
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#DAF2FD'
            },
            {
              offset: 0.5,
              color: '#FAF6FE'
            },
            {
              offset: 1,
              color: '#FFF1F6'
            }
            ],
            globalCoord: false,
            origin: 'end'
          }
        },
        lineStyle: {
          width: 2,
          type: 'solid',
          color: {
            type: 'linear',
            x: 0, // 右
            y: 0, // 下
            x2: 1, // 左
            y2: 0, // 上
            colorStops: [{
              offset: 0,
              color: '#22B7F4' // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#A27AEA' // 50% 处的颜色
            },
            {
              offset: 1,
              color: '#F83C86' // 100% 处的颜色
            }
            ],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(0,0,0,.18)',
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
        }
      }]
    }
  }

}