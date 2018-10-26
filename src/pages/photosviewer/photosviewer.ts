import { Component } from '@angular/core';
import { ViewController, NavParams, IonicPage } from 'ionic-angular';
import Swiper from 'swiper/dist/js/swiper.js';
@IonicPage()
@Component({
  selector: 'page-photosviewer',
  templateUrl: 'photosviewer.html',
})
export class PhotosViewerPage {
  public photos: string[] = [];
  initialSlide: number = 0;
  title: string;
  swiper: any;
  states: number[] = [];
  constructor(
    private viewCtrl: ViewController,
    params: NavParams
  ) {
    this.photos = params.get('images') || [];
    this.title = params.get('title');
    this.initialSlide = params.get('initialSlide') || 0;
  }
  ngAfterViewInit() {
    this.swiper = new Swiper('#swiper-container', {
      zoom: true,
      pagination: {
        el: '#swiper-pagination',
        type: 'fraction'
      },
      slideToClickedSlide: false,
      passiveListeners: true,
      initialSlide:this.initialSlide,
      on: {
        click: () => this.swiper.zoom.scale != 1 ? this.swiper.zoom.toggle() : this.viewCtrl.dismiss(),
        slideChange: () => {
            //this.swiper.zoom.disable();
          setTimeout(() => {
            //this.swiper.zoom.enable();
            this.swiper.update();
            this.swiper.detachEvents(); //移除所有slide监听事件
            this.swiper.attachEvents(); //重新绑定所有监听事件。
          }, 120);
        }
      },
    });
  }
  load(index) {
    this.states[index] = 1;
    this.swiper && this.swiper.zoom.enable();
  }
}
