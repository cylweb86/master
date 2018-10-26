import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ShortenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, maxlength=4, suffix = '...') {
   if(value && value.length > maxlength){
     value = value.substring(0,maxlength-2)+suffix;
   }
   return value;
  }
}
