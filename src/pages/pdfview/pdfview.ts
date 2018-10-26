import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeProvider } from '../../providers/native';
/**
 * Generated class for the PdfviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdfview',
  templateUrl: 'pdfview.html',
})
export class PdfviewPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private nativePro: NativeProvider
  ) { }

  share() {
    this.nativePro.share(this.navParams.get('url'), this.navParams.get('title'));
  }
}
