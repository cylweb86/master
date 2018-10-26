import { Component, Input } from '@angular/core';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'loading',
  templateUrl: 'loading.html',
})
export class Loading {
  statusValue: boolean;
  @Input() height: string = '100%';
  @Input() mess: string = '什么也木有';
  @Input() keys: string;
  @Input() set status(obj: any) {
    this.statusValue = this.check(obj);
  }
  constructor() {}

  check(obj) {
    let type = Object.prototype.toString.call(obj);
    switch (type) {
      case "[object Undefined]":
        return undefined;
      case "[object Array]":
        return !!obj.length;
      case "[object Object]":
        if (this.keys) {
          let keys = this.keys.split('.');
          for (let i = 0; i < keys.length; i++) {
            if (!obj[keys[i]]) {
              return !!obj[keys[i]];
            } else {
              obj = obj[keys[i]];
              let res = this.check(obj);
              if (!res) return !!res;
            }
          }
          return true;
        } else {
          return !!Object.keys(obj).length;
        }
      default:
        return this.keys ? false : !!obj;
    }
  }
}
