import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ApprovalPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'approval',
})
export class ApprovalPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any[], ...args) {
    if (!value.length) return value;
    let arr1: any[] = value.filter(v => v.appLv == 1);
    let arr2: any[] = value.filter(v => v.appLv == 2);
    if (!arr1.length || !arr2.length) return value;
    if (arr1[0].isPass == 2 && arr2[0].isPass == 0) {
      return arr1;
    } else {
      return value;
    }
  }
}
