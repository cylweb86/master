import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ConfigPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args) {
    switch (value) {
      case 1:
        return "待处理";
      case 2:
        return "已处理";
      case 3:
        return "无需处理";
      case 4:
        return "已撤回";
      default:
        return '';
    }
  }
}
