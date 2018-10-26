import { Injectable } from '@angular/core';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { NativeProvider } from '../native';

/*
  Generated class for the BrowserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BrowserProvider {
  loadstopSubscribe: any;
  loadfailSubscribe: any;
  shareSubscribe: any;

  constructor(
    public themeableBrowser: ThemeableBrowser,
    private nativePro: NativeProvider
  ) { }

  /**
   * 打开外部页面obj{title,url}
   */
  start(obj: any, target: string = '_blank') {

    const options: ThemeableBrowserOptions = {
      //hidden: 'yes',
      statusbar: {
        color: '#ffffffff'
      },
      // clearcache: 'yes',
      // clearsessioncache: 'yes',
      //hidden: 'yes',
      toolbar: {
        height: 44,
        color: '#ffffff',
      },
      title: {
        color: '#414a60ff',
        showPageTitle: true,
        staticText: obj.title
      },
      backButton: {
        align: 'left',
      },
      closeButton: {
        wwwImage: 'assets/icon/close-black.png',
        wwwImagePressed: 'assets/icon/close-black.png',
        align: 'left',
        wwwImageDensity: 4
      },

      customButtons: [{
        wwwImage: 'assets/icon/share-black.png',
        wwwImagePressed: 'assets/icon/share-black.png',
        align: 'right',
        wwwImageDensity: 3,
        event: 'sharePressed'
      }],
      //hidden: 'yes',
      backButtonCanClose: true
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(obj.url, target, options);

    this.shareSubscribe && this.shareSubscribe.unsubscribe();
    this.loadfailSubscribe && this.loadfailSubscribe.unsubscribe();
    this.loadstopSubscribe && this.loadstopSubscribe.unsubscribe();
    this.loadstopSubscribe = browser.on('loadstop').subscribe(event => {
      this.loadstopSubscribe.unsubscribe();
    });
    this.loadfailSubscribe = browser.on('loadfail').subscribe(event => {
      this.loadfailSubscribe.unsubscribe();
      this.nativePro.toast('网络异常，请稍后再试');
    });
    this.shareSubscribe = browser.on('sharePressed').subscribe(event => {
      this.nativePro.share(obj.share ? obj.share : obj.url, obj.title)
    });
  }
}
