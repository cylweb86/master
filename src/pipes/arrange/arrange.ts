import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ArrangePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'arrange',
})
export class ArrangePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    switch (value) {
      case 10:
        return "待审核";
      case 20:
        return "约考中";
      case 30:
        return "考试中";
      case 40:
        return "已完成";
      case 50:
        return "已关闭";
      // case 0:
      //   return "已拒绝";
      case 0:
        return "已关闭"
      default:
        return '';
    }
  }
}
