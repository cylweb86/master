import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { INFORM_PAGE, SYSTEM_PAGE } from '../../pages/pages.constants';
import { NewsProvider } from '../../providers/news/news';
import { PageSize } from '../../model/pagesize';
/**
 * Generated class for the InformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informs',
  templateUrl: 'informs.html',
})
export class InformsPage {
  companys: any;
  total: number;
  page: PageSize;
  // pages: any = {
  //   inform: INFORM_PAGE
  // }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsPro: NewsProvider
  ) { }

  ionViewDidLoad() {
    setTimeout(() => this.doRefresh(), 350);
  }

  doInfinite(event) {
    this.page.pageIndex++;
    this.newsPro.companys(this.page).then(res => {
      event.complete();
      this.companys = this.companys.concat(res.list);
    }).catch(ex => event.complete());
  }

  doRefresh(event?) {
    let exception = () => {
      this.companys = null;
      event && event.complete();
    }
    this.page = new PageSize();
    this.newsPro.informs(this.page, this.navParams.get('system')).then(res => {
      if (!res || !res.list || !res.list.length) return exception();
      this.companys = res.list;
      this.total = res.totalCount;
      event && event.complete();
    }).catch(ex => exception());
  }

  goInform(item) {
    this.navCtrl.push(this.navParams.get('system') ? SYSTEM_PAGE : INFORM_PAGE, item);
  }
}
