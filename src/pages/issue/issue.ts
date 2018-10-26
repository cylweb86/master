import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, App, ViewController } from 'ionic-angular';
import { NativeProvider } from '../../providers/native';
import { SheetProvider } from "../../providers/sheet/sheet";
import { issue } from '../../model/issue';
import { SHEET_PAGE } from '../pages.constants';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the IssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue',
  templateUrl: 'issue.html',
})
export class IssuePage {
  @ViewChild('dateModal') dateModal: DateTime;
  /**
   * 工单返回
   * @type {string}
   */
  order: { guid?: string, orderGuid?: string };

  issue: issue = new issue();

  imgid: any;
  modal: boolean = false;
  option: string[] = [];
  cache: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nativePro: NativeProvider,
    public messagepro: MessageProvider,
    public viewCtrl: ViewController,
    private sheetPro: SheetProvider,
    private appCtrl: App,
  ) { }
  close() {
    delete this.appCtrl._appRoot['_datePortal'];
  }

  open() {
    //注册关闭事件
    this.appCtrl._appRoot['_datePortal'] = {
      getActive: () => {
        return { dismiss: this.dateModal._picker.dismiss }
      }
    };
  }

  product(event) {
    this.cache = event;
    this.option = this.issue[event];
    this.modal = true;
  }

  changed(event) {
    if (this.cache == 'products') {
      this.issue.typestr = event.value;
      this.issue.type = event.index + 1;
    } else {
      this.issue.levelstr = event.value;
      this.issue.level = event.index + 1;
    }
    setTimeout(() => {
      this.modal = false;
    }, 100)
  }

  onComplete(event) {
    //失败，重新提交
    if (!event) return this.del('网络延时，请稍后再试');
    this.nativePro.hideLoading();
    this.messagepro.sendMessage('issuemsg');
    this.nativePro.success('提交成功')
      .then(res => {
        this.navCtrl.push(SHEET_PAGE, { guid: this.order.orderGuid, urls: event.urls }).then(res => {
          this.navCtrl.remove(this.viewCtrl.index, 1);
        })
      });
  }

  submit() {
    if (!this.verify()) return;
    this.nativePro.showLoading('上传中', 15000).then(res => {
      res => res && this.del('网络延时，请稍后再试')
    });
    let { title, contents, type, level, exceptTime } = this.issue;
    this.imgid ? this.order = this.imgid :
      this.sheetPro.createsheet({ title, contents, type, level, exceptTime, status: 1 })
        .then(res => {
          if (res && res.guid) {
            this.imgid = res;
            this.order = res;
          };
        })
        .catch(ex => this.del(ex.message));
  }

  verify(): boolean {
    if (!!Number(this.issue.title)) {
      this.nativePro.toast('主题不能全为数字');
      return false;
    }

    if (/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig.test(this.issue.contents)) {
      this.nativePro.toast('内容不能包含特殊字符');
      return false;
    }

    if (new Date(this.issue.exceptTime) < new Date(this.issue.minDate)) {
      this.nativePro.toast('期望日期不能是过去的时间');
      return false;
    }

    return true;
  }

  del(msg?) {
    this.sheetPro.deletesheet({ guid: this.order.guid })
      .catch(ex => { })
      .then(res => {
        this.nativePro.hideLoading();
        msg && this.nativePro.toast(msg)
      })
  }


  ngOnDestroy() {
    delete this.appCtrl._appRoot['_datePortal'];
  }


  /**
   * andorid 硬件返回 日期回调
   */
  dismiss() {
    //弹层
    let overlay: any = this.appCtrl._appRoot._modalPortal.getActive() ||
      this.appCtrl._appRoot._overlayPortal.getActive();
    if (!overlay || !overlay.dismiss) {
      overlay = this.appCtrl._appRoot['_datePortal'] && this.appCtrl._appRoot['_datePortal'].getActive ? this.appCtrl._appRoot['_datePortal'].getActive() : overlay;
    }
    if (overlay && overlay.dismiss) {
      overlay.dismiss();
      return;
    }
  }

}
