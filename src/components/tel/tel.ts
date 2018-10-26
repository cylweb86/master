import { Component, ElementRef, Input } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the TelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tel',
  templateUrl: 'tel.html'
})
export class TelComponent {
  //private tel: string;
  @Input() chooser: boolean = true;
  constructor(
    private callNumber: CallNumber,
    private el: ElementRef
  ) {}

  call() {
    this.callNumber.callNumber(this.el.nativeElement.innerText
        .replace('-', '').replace(' ', ''), this.chooser)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
