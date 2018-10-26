import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeProvider } from "../../providers/native";
import { UnionProvider } from '../../providers/union/union';
import { HandleProvider } from '../../providers/handle/handle';
/**
 * Generated class for the UnionaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unionadd',
  templateUrl: 'unionadd.html',
})
export class UnionaddPage {
  text: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativePro: NativeProvider,
    private unionPro: UnionProvider,
    private handlePro: HandleProvider
  ) { }

  submit() {
    this.unionPro.add({ guid: this.navParams.get('guid'), contents: this.text }).then(res => {
      this.handlePro.send('success');
      this.nativePro.toast('内容补充成功');
      setTimeout(() => {
        this.navCtrl.pop();
      }, 800);
    }).catch(ex => {
      if (ex && ex.message) {
        this.nativePro.toast(ex.message);
      }
    })
  }
}
