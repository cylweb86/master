import { Component, EventEmitter, Output, NgZone, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { normalizeURL } from 'ionic-angular';
import { NativeProvider } from '../../providers/native';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpProvider } from '../../providers/http';
/**
 * Generated class for the UploadimgComponent component.
 * Add by leo zhang 201710010101
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uploadimg',
  templateUrl: 'uploadimg.html',
})
export class UploadimgComponent {
  items: { data: any, state: ImageState, name: string }[] = [];
  urls: SafeResourceUrl[] = [];
  paramsValue: Object;
  uploadCount: number = 0;

  //给每张图片自己配上出生名字
  num: number = 1;
  arr: any[] = [];

  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
  @Input() service: string;
  @Input() set params(obj: Object) {
    if (obj) {
      this.paramsValue = obj;
      if (!this.items.length) {
        this.onComplete.emit({ urls: [] });
      } else {
        this.items
          .forEach(item => {
            this.upload(item)
          })
      }
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    private nativePro: NativeProvider,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private httpPro: HttpProvider
  ) { }

  picker() {
    if (this.items.length > 8) return;
    this.nativePro.sheet(['拍照', '从手机相册选择'])
      .then((buttonIndex: number) => {
        this.openCamera(buttonIndex);
      });
  }

  remove(i) {
    this.zone.run(() => this.urls.splice(i, 1));
    this.items.splice(i, 1);
  }

  /**
   * 打开摄像头
   */

  private openCamera(sourceType) {
    if (sourceType == 1) {
      this.num++;
      this.camera.getPicture({
        quality: 19,
        sourceType: this.camera.PictureSourceType.CAMERA,
      }).then(res => {
        this.items.length < 9 && this.add(res, this.num);
      }).catch(err => err);
    } else if (sourceType == 2) {
      if (this.arr.length) {
        this.arr = [];
      }
      for (let i = this.num + 1; i <= this.num + 9; i++) {
        this.arr.push(i);
      }
      this.num = this.num + 10;

      this.imagePicker.getPictures({
        maximumImagesCount: 9 - this.items.length,
        quality: 19
      }).then((results = []) => {
        for (let i = 0; i < results.length; i++) this.add(results[i], this.arr[i]);
      }).catch(err => err);
    }

  }

  private upload(item) {

    this.httpPro.uploadFile(this.service, this.paramsValue, item.data, item.name)
      .then(res => item.state = ImageState.SUCCESS)
      .catch(ex => {
        this.onComplete.emit(null);
        item.state = ImageState.FAILED;
      })
      .then(() => {
        this.uploadCount++;
        if (this.uploadCount >= this.items.length) {
          let hasFailed = !!this.items.find(x => { return x.state !== ImageState.SUCCESS });
          hasFailed && this.items.map(x => { x.state = ImageState.READY })
          this.onComplete.emit(hasFailed ? null : { urls: this.urls })
        }
      })
  }

  private add(item, id) {
    if (!item) return;
    this.items.find(x => { return x.data == item }) || this.items.push({ data: normalizeURL(item), state: ImageState.READY, name: `img${id}.png` });
    this.zone.run(() => this.urls = this.urls.concat([this.nativePro.isAndroid() ? this.sanitizer.bypassSecurityTrustResourceUrl(item) : normalizeURL(item)]));
  }
}

export enum ImageState {
  READY = 0,
  PENDING = 1,
  SUCCESS = 2,
  FAILED = 3
}
