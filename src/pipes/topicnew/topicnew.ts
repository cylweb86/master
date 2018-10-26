import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TopicnewPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'topicnew',
})
export class TopicnewPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    switch (value) {
      case 0:
        return "未命题";
      case 1:
        return "本校自主命题";
      case 2:
        return "与约考学校一起命题"
      case 3:
        return "七天网络命题";
      default:
        return '';
    }
  }
}
