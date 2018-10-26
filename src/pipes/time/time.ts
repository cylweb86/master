import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.20180909 201405 20129
   */
  transform(value: string, ...args) {
    if (value.length == 8) {
      //20190912    //20190909     //20181209   //20191212
      if (value['4'] == '0' && value['6'] == '0') {
        return value.slice(0, 4) + '年' + value.slice(5, 6) + '月' + value.slice(7) + '日';
      } else if (value['6'] == '0') {
        return value.slice(0, 4) + '年' + value.slice(4, 6) + '月' + value.slice(7) + '日';
      } else if (value['4'] == '0') {
        return value.slice(0, 4) + '年' + value.slice(5, 6) + '月' + value.slice(6) + '日';
      } else {
        return value.slice(0, 4) + '年' + value.slice(4, 6) + '月' + value.slice(6) + '日';
      }
    }
    if (value.length == 6) {
      // 201201 201211
      if (value['4'] == '0') {
        return value.slice(0, 4) + '年' + value.slice(5) + '月';
      } else {
        return value.slice(0, 4) + '年' + value.slice(4) + '月';
      }

    }

    if (value.length == 5) {
      return value.slice(0, 4) + '年' + value.slice(4) + '季度';
    }
  }
}
