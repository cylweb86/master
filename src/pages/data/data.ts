import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SCHOOLS_PAGE, DOWNLOADS_PAGE, DATATEST_PAGE, DATAOPERATE_PAGE, DATAREVENUE_PAGE, FILTER_PAGE, TODAY_PAGE } from '../../pages/pages.constants';
import { NativeProvider } from '../../providers/native';
import { Subscription } from 'rxjs/Subscription';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user';
import { DataProvider } from '../../providers/data/data';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { DownloadProvider } from '../../providers/download/download';
import { StatusBar } from '@ionic-native/status-bar';
/**
* Generated class for the DataPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {

  now: number = 0;
  progress: boolean = false;
  lock: boolean = false;
  isshow: boolean = true;
  //学贝
  study: number = 0;
  //错题本
  errbook: number = 0;
  // 视频
  video: number = 0;
  all: any;
  opt: any;
  cacheCode: string = '';

  pages: any = {
    downloads: DOWNLOADS_PAGE,
    filter: FILTER_PAGE,
    schools: SCHOOLS_PAGE,
    today: TODAY_PAGE
  };
  subscription: Subscription
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativepro: NativeProvider,
    private messagepro: MessageProvider,
    private userPro: UserProvider,
    private dataPro: DataProvider,
    private fileTransfer: FileTransfer,
    private downloadPro: DownloadProvider,
    private statusBar: StatusBar
  ) {
    this.subscription = this.messagepro.getMessage().subscribe(res => {
      let time = res.time.replace(/-/g, '');
      let area = res.area ? res.area : this.cacheCode;
      this.all = undefined;
      this.info(time, area, res.grade, res.areaText, res.gradeText);
    })
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.userPro.getMaxArea().then(res => {
        if (res) {
          this.info(res.time, res.code, undefined, res.value, '全部')
          this.cacheCode = res.code;
          this.lock = false;
        } else {
          this.all = null;
          this.lock = true;
        }
      })
    }, 350)
  }

  /**
   * 详细信息
   */
  info(time, areaCode, grade, areaText, gradeText) {
    this.study = this.errbook = this.video = 0;
    this.opt = { param: { time, areaCode, grade }, areaText: areaText, gradeText: gradeText };
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
    this.navCtrl.push(DATATEST_PAGE,
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
        //地址
        mix: this.opt.areaText + ' ' + this.opt.gradeText,
        //区域
        region: this.opt.areaText,
        //时间
        time: this.opt.param.time,
        //参数
        param: this.opt.param,
        //考生数
        studentC: this.all.PubExamStudentCount,
        allC: this.all.ExamSchool,
        //param
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
        mix: this.opt.areaText + ' ' + this.opt.gradeText,
        time: this.opt.param.time,
        //param
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
        mix: this.opt.areaText + ' ' + this.opt.gradeText,
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
        //单张试卷贡献值
        perPage,
        //查分率
        checkRate,
        //缴费率
        payRate,
        //人均考试
        perExam,
        cansee: !!this.all.CanDownLoad,
        //param
        req: this.opt.param
      }
    )
  }



  download() {
    let str = this.opt.areaText + this.opt.gradeText + this.opt.param.time;
    let downloadName = str.replace(/全部| /g, '');
    this.dataPro.download(this.opt.param).then(res => {
      if (!res) return;
      this.nativeDownload(res, downloadName);
    }).catch(ex => {
      this.nativepro.toast('下载失败');
    })
  }



  nativeDownload(res, name) {
    this.progress = true;
    this.isshow = false;
    let now: number = 0;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.download(res.url, this.downloadPro.downloadPath + name + res.suffix)
      .then((entry) => {
        this.downloadPro.setdownloads({ webUrl: res.url, nativeUrl: entry.toURL(), name: name, type: res.suffix.substr(1), isAll: true });
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
          this.navCtrl.push(DOWNLOADS_PAGE, { isAll: true })
        }, 500);
      }
    }, 10)
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
    this.statusBar.backgroundColorByHexString('#1F9DF8');
  }

}
