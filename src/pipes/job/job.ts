import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the JobPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'job',
})
export class JobPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    switch (value) {
      case 1:
        return "校长";
      case 2:
        return "教务主任";
      case 3:
        return "年级组长"
      case 4:
        return "备课组长";
      default:
        return '';
    }
  }
}
