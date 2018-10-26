import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SHEET_PAGE, ISSUE_PAGE } from '../pages.constants';
import { SheetProvider } from '../../providers/sheet/sheet';
import { PageView } from '../../model/pageview';
import { Sheet } from '../../model/sheet'
import { Subscription } from 'rxjs/Subscription';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the SheetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sheets',
  templateUrl: 'sheets.html',
})
export class SheetsPage {
  pages: any = {
    sheet: SHEET_PAGE,
    issue: ISSUE_PAGE
  };
  status: number;
  page: PageView;
  refreshing: boolean;
  sheets: Sheet[][] = [];
  activeIndex: any = "0";
  totals: number[] = [];
  pendingCount: number;
  subscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public messagepro: MessageProvider,
    public navParams: NavParams,
    private sheetpro: SheetProvider
  ) {
    this.subscription = this.messagepro.getMessage().subscribe(res => {
      res && this.doRefresh();
    })
  }
  segmentChanged(event) {
    this.activeIndex = event.value;
    this.sheets[this.activeIndex] || this.doRefresh();
  }

  ionViewDidLoad() {
    setTimeout(() => this.doRefresh(), 350);
  }

  doRefresh(event?) {
    this.refreshing = true;
    this.status = Number(this.activeIndex);
    this.page = new PageView({ index: 1, length: 10 });

    let exception = (res) => {
      event && event.complete();
      this.fillSheet(this.activeIndex);
      this.refreshing = false;
    };
    /**
     * 全部工单
     */
    this.sheetpro.issues(Object.assign({ status: this.status || undefined }, this.page))
      .then(res => {
        this.pendingCount = res.pendingCount;
        if (!res || !res.list || !res.list.length) return exception(res);
        let total = 0;
        total = res.total || total;
        this.fillSheet(this.activeIndex, { issues: res.list, total: total });
        event && event.complete();
        this.refreshing = false;
      })
      .catch(err => exception(err));
  }

  goSheet(sheet: Sheet) {
    this.sheets.map(items => {
      if (!items) return;
      let index = items.findIndex(item => { return item.guid == sheet.guid });
      index > -1 && (items[index] = sheet);
      return items;
    })
    this.navCtrl.push(this.pages.sheet, sheet);
  }

  doInfinite(event) {
    this.page.index++;
    this.sheetpro.issues(Object.assign({ status: this.status || undefined }, this.page)).then(res => {
      res = res || { list: [] };
      res.list = res.list || [];
      this.sheets[this.activeIndex] = this.sheets[this.activeIndex].concat(res.list);
      event.complete();
    }).catch(ex => {
      event.complete();
    });


  }

  fillSheet(index, res: { issues, total?: number } = { issues: null }) {
    this.sheets[index] = res.issues;
    this.totals[index] = res.total || this.pendingCount;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
