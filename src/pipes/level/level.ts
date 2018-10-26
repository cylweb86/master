import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the LevelPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'level',
})
export class LevelPipe implements PipeTransform {

  transform(value: number, ...args) {
    switch (value) {
      case 1:
        return "非常紧急";
      case 2:
        return "紧急";
      case 3:
        return "较重要";
      case 4:
        return "一般";
      default:
        return '';
    }
  }
}
