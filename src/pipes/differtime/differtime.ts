import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DiffertimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'differtime',
})
export class DiffertimePipe implements PipeTransform {
  /**
   * differTime
   */
  transform(value: string, ...args) {
    if (value) {
      let year: any;
      let month: any;
      let day: any;
      let hour: any;
      let minute: any;
      let now: any;
      let differ: any;
      year = new Date().getFullYear();
      month = new Date().getMonth() + 1;
      day = new Date().getDate();
      hour = new Date().getHours();
      if (hour < 10) {
        hour = '0' + hour;
      }
      minute = new Date().getMinutes();
      if (minute < 10) {
        minute = '0' + minute;
      }
      now = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      differ = (new Date(now.replace(/-/g, "/")).getTime() - new Date(value.replace(/-/g, "/")).getTime()) / (1000 * 60 * 60);
      if (differ > 24) {
        return value;
      }
      else if (differ <= 24 && differ > 1) {
        return Math.floor(differ) + '小时前';
      }
      else if (differ <= 1) {
        return Math.floor(differ * 60) ? Math.floor(differ * 60) + '分钟前' : '刚刚';
      }
    }
  }
}
