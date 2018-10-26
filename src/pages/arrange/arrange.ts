import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ArrangeProvider } from '../../providers/arrange/arrange';
import { NativeProvider } from '../../providers/native';
import { APPOINT_PAGE } from '../../pages/pages.constants';
import { UserProvider } from '../../providers/user';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the ArrangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arrange',
  templateUrl: 'arrange.html',
})
export class ArrangePage {
  canfoot: boolean = true;
  stateArr: string[] = ['电话联系不上', '填写信息错误'];
  arrange: Arrange;
  ExamGuid: string;
  subject: string;
  why: string;
  modal: boolean = false;
  pages: any = {
    appoint: APPOINT_PAGE
  }
  phone: string;
  name: string;
  switch: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private arrangePro: ArrangeProvider,
    private nativePro: NativeProvider,
    private alertCtrl: AlertController,
    private userPro: UserProvider,
    private statusBar: StatusBar
  ) { }

  ionViewDidLoad() {
    this.userPro.getSelfInfo().then(res => {
      this.phone = res.phone || '暂无';
      this.name = res.name || '暂无';
    }).catch(ex => ex);
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh(event?) {
    let exception = (res) => {
      this.arrange = null;
      event && event.complete();
    }
    this.ExamGuid = this.navParams.get('guid');
    this.arrangePro.arrinfo({ ExamGuid: this.ExamGuid }).then(res => {
      if (!res) return exception(res);
      if (!this.switch) {
        let reg: RegExp = new RegExp("[\u4e00-\u9fa5]");
        if (!reg.test(res.examName)) this.switch = true;
      }
      let arr = JSON.parse(res.kms).map(v => v.name);
      this.subject = arr.join();
      if (this.subject) {
        this.arrange = res;
        if (event === 0) {
          this.nativePro.hideLoading();
          this.arrangePro.send({ guid: this.ExamGuid });
        }
      }
      event && event.complete();
    }).catch(ex => {
      exception(ex);
      if (event === 0) {
        this.nativePro.hideLoading();
      }
    });
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
            this.arrangePro.agree({ examGuid: this.ExamGuid, ImgKey: '暂无图片', reviewName: this.name || '暂无姓名', reviewPhone: this.phone || '暂无' }).then(res => {
              this.arrange = undefined;
              this.doRefresh(0);
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
    if (!this.why) return this.nativePro.toast('请选择不通过的理由');
    this.nativePro.showLoading('审核提交中', 10000);
    this.modal = false;
    this.arrangePro.disagree({ examGuid: this.ExamGuid, Note: this.why, reviewName: this.name || '暂无姓名', reviewPhone: this.phone || '暂无' }).then(res => {
      this.arrange = undefined;
      this.doRefresh(0);
    }).catch(ex => {
      this.nativePro.hideLoading();
      if (ex && ex.message) {
        this.nativePro.alert(ex.message);
      }
    })
  }

  ionViewWillLeave() {
    this.canfoot = false;
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.canfoot = true;
  }
}

interface Arrange {

  city: number | string;

  country: number;

  endTime: string;

  enrollEndTime: string

  examGuid: string;

  examName: string;

  grade: string;

  inSquare: number;

  kms: string;

  kmsDesc: string;

  loginGuid: string;

  nameType: number;

  otherSchool: Other[];

  postName: number;

  province: number | string;

  reviewPhone: string;

  reviewState: number;

  schoolName: string;

  sendName: string;

  startTime: string;

}

interface Other {
  schoolName: string;
  loginGuid: string;
  joinState: number;
}