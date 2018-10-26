import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';
import { ToastController, LoadingController, Platform, AlertController, ActionSheetController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ActionSheet } from '@ionic-native/action-sheet';
import { SocialSharing } from '@ionic-native/social-sharing';
/* beautify ignore:start */
declare let ProgressIndicator: any;
/* beautify ignore:end */

/**
 * added by 442623641@qq.com 201703161032.
 * 原生API
 */

@Injectable()
export class NativeProvider {
  loadRunning: boolean = false;
  public native: boolean;
  public loading: any;



  constructor(
    public platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private ntoast: Toast,
    private dialogs: Dialogs,
    private spinnerDialog: SpinnerDialog,
    private actionSheetCtrl: ActionSheetController,
    private actionSheet: ActionSheet,
    private socialSharing: SocialSharing
  ) {
    this.native = this.isMobile();
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid() {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos() {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }


  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  toast = (message: string = '操作完成', duration: number = 2000, positon: string = "top") => {
    if (this.native) {
      return this.ntoast
        .show(message, String(duration), positon)
        .subscribe(res => {
          console.log(res);
        });
    } else {
      return this.toastCtrl.create({
        message: message,
        duration: duration,
        position: positon,
        showCloseButton: false,
      }).present();
    }
  };

  tip(message: string = '操作完成', duration: number = 1000000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'x',
      //cssClass: 'toast-tip',
      dismissOnPageChange: true,
    })
    toast.present();
    return toast;
    //return this.toast(message, duration, 'middle');
  }


  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  success = (message: string = '操作完成', duration: number = 2000) => {
    if (this.isIos()) {
      ProgressIndicator.hide();
      ProgressIndicator.showSuccess(false, message);
      return new Promise(resolve => setTimeout(() => {
        ProgressIndicator.hide();
        resolve();
      }, duration));
    } else {
      this.toast(message, duration, 'center');
      return new Promise(resolve => setTimeout(() => resolve(), duration));
    }

  };

  /**
   * 对话框
   * @param msg 信息内容
   * @buttons 按钮
   * @return {Promise<T>}
   */
  confirm = (msg: string = "确定这样做？", btns: Array<string> = ["取消", "确认"], title: string = '', shouldTitle?: boolean, shouldBackButtonIndex?: boolean) => {
    if (this.native) {
      return this.isIos() ? this.dialogs.confirm(title ? msg : title, title ? title : msg, btns).then(btn => {
        //console.log('clicked button index:' + btn);
        return shouldBackButtonIndex ? btn : Math.max(btn - 1, 0);
      }) : this.dialogs.confirm(msg, shouldTitle ? title : '', [btns[1], btns[0]]).then(btn => {
        //console.log('clicked button index:' + btn);
        return btn === 1 ? 1 : 0;
      });
    }
    return new Promise((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: title,
        enableBackdropDismiss: false,
        subTitle: msg,
        buttons: [{
          text: btns[0],
          handler: () => {
            resolve(shouldBackButtonIndex ? 1 : 0);
          }
        }, {
          text: btns[1],
          handler: () => {
            resolve(shouldBackButtonIndex ? 2 : 1);
          }
        }]
      });
      confirm.present();
    });
  }

  /**
   * 对话框
   * @param msg 信息内容
   * @buttons 按钮
   * @return {Promise<T>}
   */
  alert = (msg: string = "确定这样做？", btn: string = "我知道了", title?: string) => {
    title = title || '';
    if (this.native) {
      return title || !this.isIos() ? this.dialogs.alert(msg, title, btn) : this.dialogs.alert(title, msg, btn);
    }
    return new Promise((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: title,
        enableBackdropDismiss: false,
        //message: msg,
        subTitle: msg,
        buttons: [{
          role: "cancel",
          text: btn,
          handler: () => {
            resolve(1);
          }
        }]
      });
      confirm.present();
    });
  }

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = "加载中...", duration = 60000): Promise<any> => {
    if (this.loadRunning) {
      return Promise.resolve();
    }
    this.loadRunning = true;
    let progressCtrl: any;

    return new Promise((resolve, reject) => {
      if (this.isAndroid()) {
        progressCtrl = this.spinnerDialog;
        this.spinnerDialog.hide();
        this.spinnerDialog.show('', content, true);
      } else if (this.isIos()) {
        progressCtrl = ProgressIndicator;
        ProgressIndicator.hide();
        ProgressIndicator.showSimpleWithLabel(false, content);
      } else {
        this.loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: content,
          showBackdrop: true,
          cssClass: "embedded",
          // dismissOnPageChange: true,
          duration: duration
        });
        this.loading.present();
      }
      setTimeout(() => { //最长显示10秒
        resolve(this.loadRunning);
        this.hideLoading();
      }, duration);
    });
  };

  /**
   * 关闭loading
   */
  hideLoading = () => {
    if (this.isAndroid()) {
      this.loadRunning && this.spinnerDialog.hide();
    } else if (this.isIos()) {
      ProgressIndicator.hide();
    } else {
      this.loadRunning && this.loading.dismiss();
    }
    this.loadRunning = false;
  };

  sheet(buttons, cancelText: string = '取消', title?: string) {
    if (this.native) {
      let option: any = {
        buttonLabels: buttons,
        destructiveButtonLast: true
      }
      if (cancelText) option.addCancelButtonWithLabel = cancelText;
      return this.actionSheet.show(option);
    } else {
      return new Promise<number>(resolve => {
        let actionSheet = this.actionSheetCtrl.create({
          title: title,
          buttons: buttons.map((item, index) => {
            return {
              text: item,
              handler: () => resolve(index + 1)
            }
          }).concat([{
            text: '取消',
            role: 'cancel',
            handler: () => resolve(0)
          }])

        });
        actionSheet.present()
      });
    };
  }


  share(url: string = '', message: string = '', file: string | string[] = '') {
    return this.socialSharing.share(message, '', file, url);
  }

}
