import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeProvider } from '../../providers/native';
import { UnionProvider } from '../../providers/union/union';
import { Union } from '../../model/union';
import { HandleProvider } from '../../providers/handle/handle';
/**
 * Generated class for the HandlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-handle',
  templateUrl: 'handle.html',
})
export class HandlePage {
  guid: string;
  union: Union;
  modal: boolean = false;
  text: string;
  canfoot: boolean = true;
  grades: string[] = ['暂无', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativePro: NativeProvider,
    private unionPro: UnionProvider,
    private alertCtrl: AlertController,
    private handlePro: HandleProvider
  ) { }

  ionViewDidLoad() {
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh(event?) {
    let exception = (res) => {
      this.union = null;
      event && event.complete();
    }
    this.guid = this.navParams.get('guid');
    this.unionPro.singleUnion({ guid: this.guid }).then(res => {
      if (!res) return exception(res);
      this.union = res;
      event && event.complete();
    }).catch(ex => exception(ex));
  }

  agree() {
    const confirm = this.alertCtrl.create({
      cssClass: 'alertcomfire',
      title: '提示',
      message: '确认审核通过?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.nativePro.showLoading('审核提交中', 10000);
            this.unionPro.approval({ guid: this.guid, ispass: 1 }).then(res => {
              this.unionPro.singleUnion({ guid: this.guid }).then(res => {
                if (!res) return this.union = null;
                this.union = res;
                this.nativePro.hideLoading();
                if (res.status == 2) {
                  this.handlePro.send({ guid: this.guid, agree: true });
                }
              }).catch(ex => {
                this.union = null;
                this.nativePro.hideLoading();
              })
            }).catch(ex => {
              this.nativePro.hideLoading();
              if (ex && ex.message) {
                this.nativePro.alert(ex.message);
              }
            })
          }
        },
        {
          text: '取消'
        }
      ]
    });
    confirm.present();
  }
  comfire() {
    if (!this.text) return this.nativePro.toast('请输入审核不通过的原因');
    this.nativePro.showLoading('审核提交中', 10000);
    this.unionPro.approval({ guid: this.guid, ispass: 2, contents: this.text }).then(res => {
      this.modal = false;
      this.unionPro.singleUnion({ guid: this.guid }).then(res => {
        if (!res) return this.union = null;
        this.union = res;
        this.nativePro.hideLoading();
      }).catch(ex => {
        this.union = null;
        this.nativePro.hideLoading();
      })
      this.handlePro.send({ guid: this.guid, agree: false });
    }).catch(ex => {
      this.modal = false;
      this.nativePro.hideLoading();
      if (ex && ex.message) {
        this.nativePro.toast(ex.message);
      }
    });
  }

  ionViewWillLeave() {
    this.canfoot = false;
  }

  ionViewWillEnter() {
    this.canfoot = true;
  }
}
