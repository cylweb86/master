import { Component, Input } from '@angular/core';

@Component({
  selector: 'img-lazy',
  templateUrl: 'lazyloader.html',
})

export class LazyLoader {
  state: number = 0;
  @Input() src: string;
  @Input() alt: string;
  constructor() {
    
  }
  onLoad() {
    this.state = 1;
  }

  onError() {
    if (this.alt && (this.alt.indexOf('http://') > -1 || this.alt.indexOf('https://') > -1)) this.alt = null;
    this.state = -1;
  }
}
