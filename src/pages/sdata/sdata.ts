import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DATAREVENUE_PAGE, DATAOPERATE_PAGE, FILTER_PAGE, STEST_PAGE, DOWNLOADS_PAGE } from '../../pages/pages.constants';
import { NativeProvider } from '../../providers/native';
import { DataProvider } from '../../providers/data/data';
import { Subscription } from 'rxjs/Subscription';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { DownloadProvider } from '../../providers/download/download';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the SdataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sdata',
  templateUrl: 'sdata.html',
})
export class SdataPage {

  isshow: boolean = true;
  progress: boolean = false;
  now: number = 0;

  opt: any;
  // 学呗
  study: number = 0;
  //错题本
  errbook: number = 0;
  // 视频
  video: number = 0;
  all: any;
  pages: any = {
    filter: FILTER_PAGE,
    downloads: DOWNLOADS_PAGE
  };
  area: string;
  subscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativepro: NativeProvider,
    private dataPro: DataProvider,
    private fileTransfer: FileTransfer,
    private downloadPro: DownloadProvider,
    private statusBar: StatusBar
  ) {
    this.subscription = this.dataPro.get().subscribe(res => {
      let time = res.time.replace(/-/g, '');
      res.time = time;
      this.all = undefined;
      this.info(res);
    })
  }
  ionViewDidLoad() {
    this.dataPro.area({ schoolguid: this.navParams.data.Guid }).then(res => {
      this.area = res.Area.join(' ');
    }).catch(ex => ex);

    setTimeout(() => {
      this.info(this.navParams.data)
    }, 350)
  }


  info(res) {
    this.study = this.errbook = 0;
    this.opt = { param: { time: res.time, areaCode: this.navParams.data.areaCode, grade: res.grade, schoolGuid: this.navParams.data.Guid }, gradeText: res.gradeText };
    this.dataPro.msg(this.opt.param).then(val => {
      if (!val) return this.all = null;
      this.all = val;
      if (!this.all.ItemList) return;
      let learn = this.all.ItemList.filter(v => v.Type == "M0" || v.Type == "M5" || v.Type == "M6");
      let err = this.all.ItemList.filter(v => v.Type == "M1" || v.Type == "M3" || v.Type == "M4");
      // let mv = this.all.ItemList.filter(v => v.Type == "M7" || v.Type == "M8");
      learn.forEach(v => {
        this.study += v.Money;
      });
      err.forEach(v => {
        this.errbook += v.Money;
      })
      // mv.forEach(v => {
      //   this.video += v.Money;
      // })
    }).catch(ex => {
      this.all = null;
    })
  }


  goTest() {
    this.navCtrl.push(STEST_PAGE,
      {
        //小考
        smallT: this.all.SmallExam,
        //校考
        schoolT: this.all.SchoolExam,
        unionT: this.all.UnionExam,
        //考试数
        total: this.all.SmallExam + this.all.SchoolExam + this.all.UnionExam,
        personT: this.all.ExamStudentTime,
        answer: this.all.ResponseCount,
        //校考学校数
        schoolC: this.all.SchoolExamSchool,
        //学校年级
        mix: this.navParams.get('Name') + ' ' + this.opt.gradeText,
        //时间
        time: this.opt.param.time,
        //考试学校数
        allC: this.all.ExamSchool,
        //考生数
        studentC: this.all.PubExamStudentCount,
        req: this.opt.param
      }
    )
  }


  goRevenue() {
    this.navCtrl.push(DATAREVENUE_PAGE,
      {
        learn: this.study,
        err: this.errbook,
        video: this.video,
        total: this.errbook + this.study + this.video,
        mix: this.navParams.get('Name') + ' ' + this.opt.gradeText,
        time: this.opt.param.time,
        req: this.opt.param
      }
    )
  }


  goOperation() {
    let perPage = (!this.all.ResponseCount || !this.study) ? 0 : (this.study / this.all.ResponseCount);
    let checkRate = (!this.all.PubExamStudentCount || !this.all.ViewStudentUV) ? 0 : (this.all.ViewStudentUV / this.all.PubExamStudentCount);
    let payRate = (!this.all.ViewStudentUV || !this.all.PayedUser) ? 0 : (this.all.PayedUser / this.all.ViewStudentUV);
    let perExam = (!this.all.PubExamStudentCount || !this.study) ? 0 : (this.study / this.all.PubExamStudentCount);
    this.navCtrl.push(DATAOPERATE_PAGE,
      {
        //地点时间
        mix: this.navParams.get('Name') + ' ' + this.opt.gradeText,
        time: this.opt.param.time,
        newBindUser: this.all.NewBindUser,
        bindUser: this.all.BindUser,
        newBindStudent: this.all.NewBindStudent,
        bindStudent: this.all.BindStudent,
        //付费用户数
        payUser: this.all.PayedUser,
        //套餐用户数
        packageUser: this.all.PackageUser,
        //查分访问量
        viewPV: this.all.ViewPV,
        //付费查分PV
        viewPayPV: this.all.ViewPayPV,
        //免费查分PV
        viewFreePV: this.all.ViewFreePV,
        //查分访问人次UV
        viewUV: this.all.ViewStudentUV,
        //付费查分人次UV
        viewPayUV: this.all.ViewPayStudentUV,
        //免费查分人次UV
        viewFreeUV: this.all.ViewFreeStudentUV,
        //单张试卷收益
        perPage,
        //查分率
        checkRate,
        //缴费率
        payRate,
        //人均收益
        perExam,
        cansee: !!this.all.CanDownLoad,
        req: this.opt.param
      }
    )
  }

  download() {
    let str = this.navParams.get('areaText') + this.navParams.get('Name') + this.opt.gradeText + this.opt.param.time;
    let downloadName = str.replace(/全部| /g, '');
    this.dataPro.download(this.opt.param).then(res => {
      if (!res) return;
      this.nativeDownload(res, downloadName);
    })
  }

  nativeDownload(res, name) {
    this.progress = true;
    this.isshow = false;
    let now: number = 0;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.download(res.url, this.downloadPro.downloadPath + name + res.suffix)
      .then((entry) => {
        this.downloadPro.setdownloads({ webUrl: res.url, nativeUrl: entry.toURL(), name: name, type: res.suffix.substr(1), isAll: false })
      })
      .catch(ex => {
        this.nativepro.toast('下载失败');
      });
    fileTransfer.onProgress(progressEvent => {
      if (progressEvent.lengthComputable) {
        now = progressEvent.loaded / progressEvent.total * 100;
      }
    });

    let timer = setInterval(() => {
      this.now = Math.floor(now);
      if (now > 99) {
        clearInterval(timer);
        this.now = 100;
        setTimeout(() => {
          this.navCtrl.push(DOWNLOADS_PAGE, { isAll: false })
        }, 500);
      }
    }, 10)
  }


  goFilter() {
    this.navCtrl.push(FILTER_PAGE, { ...this.opt, type: 'school' })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.isshow = false;
    this.progress = false;
  }

  ionViewWillEnter() {
    this.isshow = true;
    this.statusBar.backgroundColorByHexString('#FB7832');
  }

}
