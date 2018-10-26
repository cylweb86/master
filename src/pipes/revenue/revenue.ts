import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RevenuePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'revenue',
})
export class RevenuePipe implements PipeTransform {
  /**
   * 66283.50
   * 每隔4位加一个,号
   */
  transform(value: any, ...args) {
    let forword = String(parseInt(value));
    let back = String(value).substring(String(value).lastIndexOf('.'));
    if (forword.length <= 4) return value;
    for (let i = 0; i < forword.length; i++) {
      if ((forword.length - i) % 4 == 0) {
        if (i == 0) {
          let b = forword.replace(/(.{4})/g, "$1,");
          let la = b.slice(0, b.lastIndexOf(','));
          return la + back;
        } else {
          let fo = forword.substring(0, i) + ',';
          let ba = forword.substring(i).replace(/(.{4})/g, "$1,");
          let last = ba.slice(0, ba.lastIndexOf(','));
          return fo + last + back;
        }
      }
    }
  }
}
