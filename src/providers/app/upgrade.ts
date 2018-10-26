import { HttpProvider } from "../http";
import { Injectable } from '@angular/core';
import { NativeProvider } from '../native';
import { Application } from '../../model/application';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Market } from '@ionic-native/market';
import { AppVersion } from '@ionic-native/app-version';
import { API_VERSION } from '../providers.constants';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UpgradeProvider {
  localVersion: string = API_VERSION;
  remoteVersion: string = API_VERSION;
  updating: boolean;
  constructor(
    private http: HttpProvider,
    private nativePro: NativeProvider,
    private file: File,
    private fileOpener: FileOpener,
    private market: Market,
    private appVersion: AppVersion
  ) { }

  setVersion(version) {
    this.localVersion = version;

  }

  checkUpdate(redirect: boolean = true): Promise<any> {
    return this.preferences().then((remote: Application) => {
      if (!remote) { return !!remote; }
      this.remoteVersion = remote.version;
      if (this.number(remote.version) > this.number(this.localVersion)) {
        if (this.nativePro.isIos() && redirect) {
          this.market.open('id1373194720');
          return false;
        } else {
          let fileName = `septnet.business${this.number(remote.version)}.apk`;
          this.file.checkFile(this.file.externalCacheDirectory, fileName)
            .then(exist => {
              this.dialog(remote, fileName, exist);
            }).catch(ex => {
              this.dialog(remote, fileName);
            })
          return true;
        }
      }
      return false;
    }).catch(ex => {
      return Promise.resolve(false);
    })
  }

  dialog(remote: Application, fileName, exist?) {
    let callback = btn => {
      if (this.nativePro.isIos()) {
        this.market.open('id1373194720');
      } else {
        btn && (exist ? this.install(fileName) : this.download(remote.url, fileName));
      }
    };

    remote.strict ?
      this.nativePro.alert(remote.memo, exist ? '立即安装' : '立即更新', '发现新版本').then(res => callback(res)) :
      this.nativePro.confirm(remote.memo, ['稍后再说', exist ? '立即安装' : '立即更新'], '发现新版本', true)
        .then(btn => btn && callback(btn));
  }

  private number(val) {
    return Number(val.replace(/\./g, ''));
  }

  /*
   * 下载
   */
  private download(url, fileName) {
    this.updating = true;
    let tip = this.nativePro.tip('正在下载安装包...');
    this.http.downloadFile(url, this.file.externalCacheDirectory + fileName)
      .then((entry) => {
        this.updating = false;
        tip.dismiss();
        this.install(fileName);
      })
      .catch(ex => {
        this.updating = false;
        tip.dismiss();
        this.nativePro.alert('下载安装包失败，请手动下载安装')
          .then(res => {
            res && window.open(url, '_system');
          })
        console.log(ex);
      })
  }

  /*
   * 安装app
   */
  private install(fileName, shouldDelete?: boolean) {
    this.fileOpener.open(this.file.externalCacheDirectory + fileName, 'application/vnd.android.package-archive')
      .then(() => console.log('File is opened'))
      .catch(e => {
        this.nativePro.confirm('安装失败，请手动安装', ['稍后再试', '手动安装']).then(res => {
          this.file.removeFile(this.file.externalCacheDirectory, fileName).catch(ex => { });
          shouldDelete ? this.checkUpdate() : this.install(fileName, true)
        })
      });
  }

  /*
   * 应用配置信息
   */
  preferences(): Promise<any> {
    return this.http.get('index/appinfo', { platform: this.nativePro.isIos() ? 'ios' : 'android' });
  }

  /**
   * 版本号
   */
  getMachineVerison() {
    if (this.nativePro.native) {
      return this.appVersion.getVersionNumber();
    } else {
      return Promise.resolve(API_VERSION);
    }
  }
}
