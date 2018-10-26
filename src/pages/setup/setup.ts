import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserProvider } from '../../providers/user';
import { UpgradeProvider } from '../../providers/app/upgrade';
import { NativeProvider } from '../../providers/native';
/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  constructor(
    private userProvider: UserProvider,
    private upgradePro: UpgradeProvider,
    private nativePro: NativeProvider
  ) {}

  logout() {
    this.userProvider.logout();
  }
  checkUpdate() {
    this.upgradePro.checkUpdate().then(res => res || this.nativePro.isAndroid() && this.nativePro.toast('已经是最新版本'));
  }

}
