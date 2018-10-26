import { Directive, Input, ElementRef } from '@angular/core';
import { ModalController, Gesture } from 'ionic-angular';
import { PHOTOSVIEWER_PAGE } from '../../pages/pages.constants';
import { NativeProvider } from '../../providers/native';
/**
 * Generated class for the ImgviewerDirective directive.
 * Add by leo zhang 201710010101
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[imgviewer]', // Attribute selector
})
export class ImgviewerDirective {
  imgviewerValue: any;
  clicked: boolean;
  @Input('imgviewer')
  set imgviewer(objs) {
    this.imgviewerValue = objs;
    objs && this.clicked && this.openModal();
  };
  get imgviewer() {
    return this.imgviewerValue;
  }

  gesture: Gesture;

  processing: boolean;
  binded: boolean;

  constructor(
    public modalCtrl: ModalController,
    private el: ElementRef,
    private nativePro: NativeProvider
  ) {}

  ngAfterViewInit() {
    this.bind();
  }

  /**
   *查看更多哦小题得分情况
   */
  openModal(event ? ) {
    if (!this.imgviewer) return this.clicked = true;
    if (!this.imgviewer.images.length) return this.nativePro.toast('暂无数据，请稍后再试', 1800, "center");
    this.clicked = false;
    this.ionViewDidLeave();
    let modal = this.modalCtrl.create(PHOTOSVIEWER_PAGE , Object.assign({}, this.imgviewer));
    modal.present();
    modal.onDidDismiss(() => { this.ionViewDidEnter() });
  }

  private bind() {
    if (this.binded) return;
    this.gesture = this.gesture || new Gesture(this.el.nativeElement);
    this.gesture.listen();
    this.gesture.on('tap', this.openModal.bind(this));
    this.binded = true;
  }

  ionViewDidLeave() {
    this.binded = false;
    this.gesture.off('tap', this.openModal);
    this.gesture.unlisten();
  }

  ionViewDidEnter() {
    this.bind();
  }

  ngOnDestroy() {
    if (this.gesture) {
      //this.gesture.off && this.gesture.off('tap', this.openModal);
      this.gesture.unlisten();
      this.gesture.destroy();
    }
  }


}
