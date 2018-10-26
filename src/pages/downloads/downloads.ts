import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeProvider } from '../../providers/native';
import { DownloadProvider } from '../../providers/download/download';
import { Clipboard } from '@ionic-native/clipboard';
import { FileOpener } from '@ionic-native/file-opener';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the DownloadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-downloads',
  templateUrl: 'downloads.html',
})
export class DownloadsPage {
  downloads: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativePro: NativeProvider,
    private downloadPro: DownloadProvider,
    private fileOpener: FileOpener,
    private clipboard: Clipboard,
    private statusBar: StatusBar
  ) { }

  ngAfterViewInit() {
    this.downloadPro.getdownloads(this.navParams.get('isAll')).then(res => {
      if (!res) return this.downloads = null;
      this.downloads = res;
    }).catch(ex => {
      this.downloads = null;
    })
  }

  check(val) {
    // 检测Android手机中是否安装了wps软件
    this.fileOpener.appIsInstalled('cn.wps.moffice_eng').then(res => {
      if (!res.status) {
        this.nativePro.toast('请安装专业wps软件打开文件');
      } else {
        wpsOpen();
      }
    }).catch(ex => {
      this.nativePro.toast('请安装专业wps软件打开文件');
    })

    let wpsOpen = () => {
      this.fileOpener.open(decodeURI(val.nativeUrl), this.downloadPro.getFileMimeType(val.type))
        .then(() => {
          //  console.log('打开成功');
        })
        .catch(() => {
          this.nativePro.toast('打开失败');
        })
    }

  }

  del(val, i) {
    this.downloadPro.del(val);
    this.downloads.splice(i, 1);
  }

  copy(val) {
    this.clipboard.copy(val.webUrl).then(res => {
      this.nativePro.toast('复制成功');
    });

  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
  }
}
