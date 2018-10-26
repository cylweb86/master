import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NumtoupperPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'numtoupper',
})
export class NumtoupperPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (!value || Number(value[0]) == NaN) return value;
    let upperNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    return upperNumber[value[0]] + '级审核';
  }
}
