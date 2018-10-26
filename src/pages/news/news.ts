import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { INFORMS_PAGE } from '../pages.constants';
import { StatusBar } from '@ionic-native/status-bar';
import { NewsProvider } from '../../providers/news/news';
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  pages: any = {
    informs: INFORMS_PAGE
  }
  /**
   *companyNotice: 0
    homeMessage: 0
    systemMessage: 0 
   */
  news: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusBar: StatusBar,
    private newsPro: NewsProvider
  ) {
    this.newsPro.count$.subscribe(res => {
      this.news = res;
    })
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#fff');
  }

  doRefresh(event) {
    this.newsPro.all().then(res => {
      event && event.complete();
    });
  }

  ngAfterViewInit() {
    this.news = this.news || this.navParams.data;
  }
}
