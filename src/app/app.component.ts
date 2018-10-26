import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppProvider } from '../providers/app/app';
import { LOGIN_PAGE, TABS_PAGE } from '../pages/pages.constants';
import { UserProvider } from '../providers/user';
//import { SYSTEM_PAGE } from '../pages/pages.constants';
@Component({
  template: '<ion-nav #rootNav></ion-nav>'
})

export class MyApp {
  @ViewChild('rootNav') rootNav: NavController;
  constructor(
    private splashScreen: SplashScreen,
    private userPro: UserProvider,
    appPro: AppProvider,
    platform: Platform,

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      appPro.initiliaze().then(() => this.login());
    });
  }


  private login() {
    return this.userPro.getLogin().then(login => {
      login && login.usercode && login.password ?
        this.userPro
          .login(login)
          .then(res => this.to(!res || !res.token ? LOGIN_PAGE : TABS_PAGE))
          .catch(() => this.to(LOGIN_PAGE)) :
        this.to(LOGIN_PAGE);
    });
  }

  to(page: any) {
    this.rootNav.setRoot(page).then(res => setTimeout(() => this.splashScreen.hide(), 300));
    //this.rootNav.setRoot(SYSTEM_PAGE);
  }
}
