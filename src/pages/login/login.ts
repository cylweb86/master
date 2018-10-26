import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user';
import { TABS_PAGE, FORGET_PAGE } from '../pages.constants';
import { NativeProvider } from '../../providers/native';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  pages: any = {
    forget: FORGET_PAGE,
  };
  authForm: FormGroup;

  constructor(
    private userPro: UserProvider,
    private nativePro: NativeProvider,
    private appCtrl: App,
    formBuilder: FormBuilder
  ) {
    this.authForm = formBuilder.group({
      usercode: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^1[0-9]{10}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
    });
    this.authForm.valueChanges.subscribe(res => {
      this.authForm['processing'] = this.authForm.valid ? false : undefined;
    });

    this.userPro.getLogin().then(res => {
      res = res || {};
      res.password = res.password || '123456';
      res.usercode = res.usercode || '13966924259';
      this.authForm.setValue(res);
    })
  }

  /**
   *
   * <!--
   * undefined 就禁止 false的话默认显示文字内容
   * true 就转圈提交
   * -->
   */
  login(obj) {
    this.authForm['processing'] = true;
    this.userPro.login(obj)
      .then(res => {
        if (!res || !res.token) return;
        this.appCtrl.getRootNavs()[0].setRoot(TABS_PAGE, {}, {
          animate: true,
          animation: 'md-transition',
          direction: 'back',
          duration: 500
        })
          .then(res => this.authForm['processing'] = false)
      })
      .catch((res = { message: "网络异常，请稍后再试", status: 500 }) => {
        this.authForm['processing'] = false;
        this.nativePro.toast(res.message);
      });
  }
}
