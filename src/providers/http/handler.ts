import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { App } from 'ionic-angular';
import { NativeProvider } from '../native';
/*
异常处理
*/
@Injectable()
export class HttpHandler {
  loging: boolean;
  private handleErrorSource = new Subject<any>();
  constructor(private appCtrl: App, private nativePro: NativeProvider) {

  }

  // Service message commands
  handleMessage(message: string) {
    throw { status: 403, message: message };
  }

  handleAuth(message?: string) {
    const LOGIN = 'LoginPage';
    if (this.loging) return;
    this.loging = true;
    message && this.nativePro.toast(message);
    if (this.appCtrl.getActiveNav().getActive().id == LOGIN) return;
    this.appCtrl.getRootNavs()[0].setRoot(LOGIN, {}, { animate: true, animation: 'md-transition', direction: 'back' });
    setTimeout(() => this.loging = false, 1000);
  }

  handleError(error?: any) {
    this.handleErrorSource.next(error);
    throw error;
  }

  extractData(res) {
    if (!res || !res.status) {
      res = { status: 500, message: res };
      this.handleError(res);
    } else if (res.status == 200) //成功
    {
      return res.data || {};
    } else if (res.status == 401) {
      this.handleAuth(res.message);
      throw res;
    } else if (res.status == 403) {
      this.handleMessage(res.message);
      throw res;
    } else {
      this.handleError(res);
      throw res;
    }
  }

  json(res: any) {
    let data = {};
    try {
      if (res.status >= 400) throw { status: 600, message: '请查看网络是否连接' }
      data = res.data ? JSON.parse(res.data) : data = res.json();
    } catch (ex) {
      this.handleError(ex.message || '网络延时，请稍后再试');
    }
    if (typeof data == "string") {
      data = JSON.parse(data);
    }
    return this.extractData(data);
  }

}
