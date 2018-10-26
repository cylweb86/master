import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { BrowserProvider } from '../../providers/browser/browser';
import { PDFVIEW_PAGE } from '../../pages/pages.constants';
/**
 * Generated class for the InformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inform',
  templateUrl: 'inform.html',
})
export class InformPage {
  company: any;
  isNative: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsPro: NewsProvider,
    private browser: BrowserProvider,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    this.isNative = this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  ngAfterViewInit() {
    let cache: any = this.navParams.data.isRead;
    if (this.navParams.data.isRead == 0) {
      this.navParams.data.isRead = 1;
    }
    this.newsPro.company({ guid: this.navParams.get('guid') }).then(res => {
      if (!res) this.company = null;
      this.company = res;
      if (cache == 0) {
        this.newsPro.all();
      }
    }).catch(ex => this.company = null);
  }

  see(val) {
    let suffix = val.name.substring(val.name.lastIndexOf('.') + 1);
    let name = val.name.substring(0, val.name.lastIndexOf('.'));
    if (suffix.indexOf('doc') > -1 || suffix.indexOf('ppt') > -1 || suffix.indexOf('xls') > -1) {
      this.browser.start({ title: name, url: "https://view.officeapps.live.com/op/view.aspx?src=" + encodeURIComponent(val.path), share: val.path });
    } else if (suffix.indexOf('pdf') > -1) {
      let modal = this.modalCtrl.create(PDFVIEW_PAGE, {
        title: name,
        // url: window.location.origin + '/' + val.path.substring(val.path.indexOf('oa'))
        url: this.isNative ? val.path : window.location.origin + '/' + val.path.substring(val.path.indexOf('oa'))
      })
      modal.present();
    }
    else {
      this.browser.start({ title: name, url: val.path });
    }
  }
}
