import { Component, Input, ElementRef } from '@angular/core';
import * as echarts from 'echarts';
/**
 * Generated class for the EchartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'echart',
  template: ''
})
export class EchartComponent {
  _option: any;
  chart: any;
  @Input() set option(opt) {
    //console.log(opt);
    this._option = opt;
    opt && this.chart && this.chart.setOption(this._option);

  };

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.chart = echarts.init(this.el.nativeElement);
    this._option && this.chart.setOption(this._option);
  }

}
