import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HOME_PAGE, USERCENTER_PAGE, NEWS_PAGE } from '../../pages/pages.constants';
import { NewsProvider } from '../../providers/news/news';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  check: boolean = false;
  hasreq: any;
  tab1Root = HOME_PAGE;
  tab2Root = NEWS_PAGE;
  tab3Root = USERCENTER_PAGE;
  constructor(
    private news: NewsProvider
  ) {
    this.news.all();
    this.news.count$.subscribe(res => {
      this.hasreq = res;
      this.check = false;
    })
  }



  /**
    companyNotice: 3
    homeMessage: 3
    systemMessage: 0 
   * 
   */
  dorefresh() {
    this.news.all();
  }

  checkChange(event) {
    if (event) this.dorefresh();
  }
}
