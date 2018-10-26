import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {

  transform(value: number, ...args) {
    switch (value){
      case 1:
        return "产品操作类";
      case 2:
        return "建议体验类";
      case 3:
        return "运营活动类";
      case 4:
        return "业务流程类";
      default:
        return '';
    }
  }
}
