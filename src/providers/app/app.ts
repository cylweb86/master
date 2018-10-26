import { HttpProvider } from "../http";
import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeProvider } from '../native';
import { HardbackProvider } from './hardback';
import { Keyboard } from '@ionic-native/keyboard';
/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {
  constructor(
    public http: HttpProvider,
    private nativePro: NativeProvider,
    private statusBar: StatusBar,
    private hardbackPro: HardbackProvider,
    private config: Config,
    private keyboard: Keyboard,
  ) { }

  initiliaze() {
    //statusBar style
    this.statusBar.styleLightContent();
    this.statusBar.styleDefault();
    if (this.nativePro.isAndroid()) {
      this.statusBar.backgroundColorByHexString("#ffffff");
      //安卓硬件返回功能
      this.hardbackPro.registerBackButtonAction();

      //键盘弹出
      this.config.set('android', 'scrollPadding', false);
      this.config.set('android', 'scrollAssist', true);
      this.config.set('android', 'autoFocusAssist', false);
    }
    this.keyboard.hideKeyboardAccessoryBar(false);
    return Promise.resolve();
  }

}
