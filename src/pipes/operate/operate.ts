import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OperatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'operate',
})
export class OperatePipe implements PipeTransform {

  transform(value: string, ...args) {
    if (!value) return ''
    switch (value) {
      case 'perExam':
        return '人均收益';
      case 'perPage':
        return '单张考卷收益';
      case 'checkRate':
        return '查分率';
      case 'payRate':
        return '缴费率';
      case 'ViewFreeStudentUV':
        return '免费查分人数'
      case 'ViewPayStudentUV':
        return '付费查分人数'
      case 'ViewFreePV':
        return '免费查分访问量'
      case 'ViewPayPV':
        return '付费查分访问量'
      case 'BindStudent':
        return '累计绑定学生数'
      case 'NewBindStudent':
        return '新增绑定学生数'
      case 'NewBindUser':
        return '新增注册用户数'
      default:
        return '';
    }
  }
}
