import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UnionProvider } from '../../providers/union/union';
import { Union } from '../../model/union';
import { NativeProvider } from '../../providers/native';
import { UNIONADD_PAGE } from '../pages.constants';
import { HandleProvider } from '../../providers/handle/handle';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the UnionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-union',
  templateUrl: 'union.html',
})
export class UnionPage {
  union: Union;
  guid: string;
  canfoot: boolean = true;
  pages: any = {
    unionadd: UNIONADD_PAGE
  };
  subscription: Subscription;
  endtime: string;
  grades: string[] = ['暂无', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'];
  applyn: string[] = ['暂无', '申请发布成绩', '申请发布成绩', '已申请', '已发布'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private unionPro: UnionProvider,
    private nativePro: NativeProvider,
    private alertCtrl: AlertController,
    private handlePro: HandleProvider
  ) {
    this.subscription = this.handlePro.get().subscribe(res => {
      this.doRefresh();
    })
  }

  ionViewDidLoad() {
    /**
      待审核 撤回+补充  
      待审核还有一种情况是二级审核时其中一个审核通过后而另一个没有通过 也应该是内容补充
      已审核 补充
      已撤销 null
      审核不通过 null
      发布成绩按钮都审核通过 有
      部分审核通过 没有
      总结一下 就是三种情况 两个 没有
      1个仅部分审核通过只有内容补充
     */
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh() {
    this.union = undefined;
    this.guid = this.navParams.get('guid');
    this.navParams.data.hasNewReply = false;
    this.unionPro.singleUnion({ guid: this.guid }).then(res => {
      if (!res) return this.union = null;
      this.union = res;
      let m = res.examTimeEnd.substr(5, 2);
      m = m[0] == '0' ? m[1] : m;
      let d = res.examTimeEnd.substr(8, 2);
      d = d[0] == '0' ? d[1] : d;
      this.endtime = `${m}月${d}日`;
    }).catch(ex => this.union = null);
  }

  doissue() {
    this.union.isCanRevoke ? this.recall() : this.apply();
  }

  recall() {
    const confirm = this.alertCtrl.create({
      cssClass: 'alertcomfire',
      title: '提示',
      message: '确定撤回这条工单信息?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.unionPro.recall({ guid: this.guid }).then(res => {
              this.unionPro.send({ guid: this.guid });
              this.doRefresh();
              this.nativePro.toast('工单撤销成功');
            }).catch(ex => {
              if (ex && ex.message) {
                this.nativePro.toast(ex.message);
              }
            });
          }
        },
        {
          text: '取消'
        }
      ]
    });
    confirm.present();
  }

  apply() {
    if (this.union.isCanRelease != 2) return;
    let application = this.alertCtrl.create({
      cssClass: 'alertcomfire',
      title: '提示',
      message: `
      <p>提交申请前请确认：</p>
      <p>1、成绩是否已经计算完全</p>
      <p>2、试题卷及答案是否已经上传及切割</p>
      <p>3、分文理科的考试成绩发布，申请后请在内容补充中说明，若文科或理科成绩已发布，可在内容补充中申请另一科成绩发布。</P>
      `,
      buttons: [{
        text: '确定',
        handler: () => {
          this.unionPro.release({ guid: this.guid }).then(res => {
            this.doRefresh();
            this.nativePro.toast('成绩发布成功');
          }).catch(ex => {
            if (ex && ex.message) {
              this.nativePro.toast(ex.message);
            }
          })
        }
      }, {
        text: '取消'
      }]
    });
    application.present();
  }

  ionViewWillLeave() {
    this.canfoot = false;
  }

  ionViewWillEnter() {
    this.canfoot = true;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}