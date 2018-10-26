import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SheetProvider } from '../../providers/sheet/sheet';
import { NativeProvider } from '../../providers/native';
import { sheetMsg } from '../../model/sheetmsg';
import { ADD_PAGE } from '../pages.constants';
import { Subscription } from 'rxjs/Subscription';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the SheetmessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sheet',
  templateUrl: 'sheet.html',
})
export class SheetPage {
  urls: any[] = [];
  pages: any = {
    add: ADD_PAGE
  };
  subscription: Subscription;
  switch: boolean = false;
  sheet: sheetMsg;
  add: any[] = [];
  guid: string;
  operation = { restart: ['重新开启', 1], cancel: ['撤回', 4] }
  constructor(
    public navCtrl: NavController,
    public messagepro: MessageProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private sheetpro: SheetProvider,
    private nativepro: NativeProvider,
    private alertCtrl: AlertController
  ) {
    this.subscription = this.messagepro.getMessage().subscribe(res => {
      if (res instanceof Array) {
        this.sheetpro.issue({ guid: this.guid }).then(result => {
          if (!result) return;
          this.sheet = new sheetMsg(result);
          this.sheet.contents.slice(this.sheet.contents.length - 1)[0].images = res;
          this.add = this.sheet.contents.slice(1);
        }).catch(err => this.nativepro.toast(err.message));
      }
    })
  }

  doIssue(opt) {
    const confirm = this.alertCtrl.create({
      cssClass: 'alertcomfire',
      title: '提示',
      message: `确定要${this.operation[opt][0]}该工单?`,
      buttons: [{
        text: '确定',
        handler: () => {
          this.nativepro.showLoading(`${this.operation[opt][0]}中`, 1000);
          this.sheetpro.dealsheet({ guid: this.guid }, opt).then(res => {
            this.navParams.data.status = this.operation[opt][1];
            opt == 'restart' ? this.sheet.status = 1 : this.sheet.status = 4;
            this.nativepro.hideLoading();
            this.nativepro.toast('操作成功');
          }).catch(ex => {
            this.nativepro.hideLoading();
            if (ex && ex.message) {
              this.nativepro.toast(ex.message);
            }
          })
        }
      }, {
        text: '取消'
      }]
    });
    confirm.present();
  }

  addcon() {
    this.navCtrl.push(ADD_PAGE, {
      id: this.guid
    })
  }


  ionViewDidLoad() {
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh(event?) {
    this.urls = this.navParams.get('urls');
    let exception = (res) => {
      this.sheet = null;
      event && event.complete();
    };
    this.guid = this.navParams.get('guid');
    this.navParams.data.hasMsg = false;
    this.sheetpro.issue({ guid: this.guid }).then(res => {
      if (!res) return exception(res);
      this.sheet = new sheetMsg(res);
      if (!this.sheet.contents[0].images.length) {
        this.sheet.contents[0].images = this.urls;
      }
      this.add = this.sheet.contents.slice(1);
      event && event.complete();
    }).catch(err => exception(err));

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
