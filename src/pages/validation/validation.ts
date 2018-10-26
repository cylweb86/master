import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PASSWORD_PAGE } from '../pages.constants';
import { PasswordProvider } from "../../providers/password/password";
import { NativeProvider } from "../../providers/native";
import {HttpProvider} from "../../providers/http";
@IonicPage()
@Component({
  selector: 'page-validation',
  templateUrl: 'validation.html'
})


export class ValidationPage {
  phone: string;
  interval: number = 0;
  private oldcode: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private nativePro: NativeProvider,
    private passwordPro: PasswordProvider,
    private httpPro:HttpProvider,
  ) {
    this.phone = this.navParams.get('phone');
  }
  
  ionViewDidLoad(){
    this.sendcode();
  }

  sendcode() {
    this.interval = 60;
    this.oldcode = 0;
    this.passwordPro.sendmsg({ userCode: this.phone })
      .then(res => {
        this.httpPro.setToken(res.token);
      }).catch(err => {
        this.nativePro.toast(err.message);
      });
    const timer = setInterval(() => {
      this.interval--;
      this.interval <= 0 && clearTimeout(timer);
    }, 1000)
  }

  verify(val) {
    if (this.oldcode === val || val < 100000) return;
    this.oldcode = val;
    this.nativePro.showLoading('验证中...');
    this.passwordPro.verifymsg({ code: val })
      .then(res => {
        this.nativePro.hideLoading();
        res && res.result ? this.navCtrl.push(PASSWORD_PAGE, { code: val, phone: this.phone }) : this.nativePro.toast('请输入正确的验证码');
      }).catch(err => (this.nativePro.hideLoading(), this.nativePro.toast(err.message)))
  }

}
