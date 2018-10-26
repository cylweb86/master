import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TestPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'test',
})
export class TestPipe implements PipeTransform {
  transform(value: string, ...args) {
    if (!value) return ''
    switch (value) {
      case 'SchoolExam':
        return '校考次数';
      case 'SmallExam':
        return '小考次数';
      case 'UnionExam':
        return '联考次数';
      case 'SchoolExamSchool':
        return '有校考学校数';
      default:
        return '';
    }
  }
}
