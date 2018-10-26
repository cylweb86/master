import { Injectable } from '@angular/core';
import { Platform, App, NavController, Keyboard } from 'ionic-angular';
import { NativeProvider } from '../native';


@Injectable()
export class HardbackProvider {

  //控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;

  //构造函数 依赖注入
  constructor(public platform: Platform,
    public appCtrl: App,
    public nativePto: NativeProvider,
    public keyboard: Keyboard) {}

  //注册方法
  registerBackButtonAction(): void {

    //registerBackButtonAction是系统自带的方法
    this.platform.registerBackButtonAction(() => {
      //loading
      if (this.nativePto.loading) {
        this.nativePto.hideLoading();
        return;
      }

      //键盘
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }
      
     //弹层
     let overlay:any = this.appCtrl._appRoot._modalPortal.getActive()
     ||this.appCtrl._appRoot._overlayPortal.getActive();
     if(!overlay || !overlay.dismiss) {
       overlay=this.appCtrl._appRoot['_datePortal']&&this.appCtrl._appRoot['_datePortal'].getActive?this.appCtrl._appRoot['_datePortal'].getActive():overlay;
     }
     if (overlay && overlay.dismiss) {
       overlay.dismiss();
       return;
     }
      //获取NavController
      let activeNav: NavController = this.appCtrl.getActiveNav();
      //如果可以返回上一页，则执行pop
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        this.showExit();
      }
    });
  }

  //退出应用方法
  private showExit(): void {
    //如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      //第一次按，弹出Toast
      this.nativePto.toast('再按一次退出', 1500, 'bottom');
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}
