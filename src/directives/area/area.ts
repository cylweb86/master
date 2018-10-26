import { Directive,ElementRef, HostListener } from '@angular/core';

/**
 * Generated class for the AreaDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[area]' // Attribute selector
})
export class AreaDirective {
  content:RegExp=/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  constructor(el: ElementRef) {}
  @HostListener('ionChange', ['$event'])
  change(e){
    if(this.content.test(e.value)){
       e.value=e.value.replace(this.content,'');
    }
  }
}
