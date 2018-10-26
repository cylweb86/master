import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ZeroPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'zero',
})
export class ZeroPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any) {
    if (String(value).length < 6) {
      let pre: number = 6 - String(value).length;
      let str: string = '';
      for (let i = 1; i <= pre; i++) {
        str += '0';
      }
      return str + value;
    } else {
      return '';
    }
  }
}
