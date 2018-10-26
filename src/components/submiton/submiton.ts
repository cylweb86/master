import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the SubmitonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'submiton',
  templateUrl: 'submiton.html'
})
export class SubmitonComponent {
  constructor() { }
  @Input() stateValue: boolean;
  @Output() stateChange = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Input()
  get state() {
    return this.stateValue;
  }
  set state(val: boolean) {
    if (this.stateValue == val) return;
    this.stateValue = val;
    val && this.stateChange.emit(this.stateValue);
  }
  onTap() {
    if (this.stateValue) return;
    if (this.onClick.observers.length) this.onClick.emit();
    //if (this.stateChange.observers.length) setTimeout(() => this.state = true, 40);
  }
}
