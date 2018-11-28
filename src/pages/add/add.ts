import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeProvider } from "../../providers/native";
import { MessageProvider } from '../../providers/message/message';
import { SheetProvider } from '../../providers/sheet/sheet';


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  hello:any;
  text: any;
  /**
   * 工单返回
   * @type {string}
   */
  order: { guid?: string, orderGuid?: string };

  imgid:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public messagepro: MessageProvider,
    public nativePro: NativeProvider,
    private sheetPro: SheetProvider,
  ) { }


  onComplete(event) {
    if (!event) return this.del('网络延时，请稍后再试');
    this.nativePro.hideLoading();
    this.messagepro.sendMessage(event.urls);
    this.nativePro.success('提交成功').then(res => this.navCtrl.pop());
  }

  submit() {
    if (!this.verify()) return;
    this.nativePro.showLoading('上传中', 15000).then(res => {
      res => res && this.del('网络延时，请稍后再试')
    });
    this.imgid ? this.order = this.imgid :
    this.sheetPro.addcontent({ guid: this.navParams.get('id'), contents: this.text })
      .then(res => {
        if (res && res.guid) {
          this.imgid = res;
          this.order = res;
        };
      })
      .catch(ex => {
        this.nativePro.toast(ex.message);
      })
  }

  verify(): boolean {
    if (/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig.test(this.text)) {
      this.nativePro.toast('内容不能包含特殊字符');
      return false;
    }
    return true;
  }
  del(msg?) {
    this.sheetPro.deletesheet({ guid: this.order.guid })
      .catch(ex => ex)
      .then(() => {
        this.nativePro.hideLoading();
        msg && this.nativePro.toast(msg)
      })
  }
}
