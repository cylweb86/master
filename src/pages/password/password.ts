import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LOGIN_PAGE } from "../pages.constants";
import { NativeProvider } from "../../providers/native";
import { PasswordProvider } from "../../providers/password/password";

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  isshow: boolean = true;
  formgroup: FormGroup;
  usercode: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formGroup: FormBuilder,
    private appCtrl: App,
    private nativePro: NativeProvider,
    private passwordPro: PasswordProvider
  ) {
    this.usercode = navParams.get('phone');
    let validators = ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      controls = {
        password: validators,
        repassword: validators,
      }
    this.usercode || (controls['oldpwd'] = validators);
    this.formgroup = formGroup.group(controls);
  }

  onSubmit(value) {
    this.usercode ?
      // {userCode:手机号码,code:验证码,password:新密码}
      this.passwordPro.changepwd({ userCode: this.usercode, code: this.navParams.get('code'), password: value.password }).then(res => {
        this.sucess('密码找回成功');
      }).catch(err => {
        this.nativePro.toast(err.message);
      }) :
      // {oldpwd旧密码，newpwd:新密码}
      this.passwordPro.loginedChangepwd({ oldpwd: value.oldpwd, newpwd: value.password }).then(res => {
        this.sucess('密码修改成功');
      }).catch(err => {
        this.nativePro.toast(err.message);
      });
  }
  sucess(msg) {
    this.nativePro.success(msg);
    this.appCtrl.getRootNavs()[0].setRoot(LOGIN_PAGE, {}, { animate: true, animation: 'ios-transition', direction: 'back' });
  }

}
