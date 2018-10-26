import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the JoinPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    switch (value) {
      // case 0:
      //   return "已拒绝";
      case 2:
        return "申请中";
      case 20:
        return "约考中"
      case 30:
        return "考试中";
      case 40:
        return "已完成";
      case 50:
        return "约考失败";
      case 0:
        return "约考失败";
      default:
        return '';
    }
  }
}
