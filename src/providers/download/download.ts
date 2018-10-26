import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { DOWNLOAD } from '../../providers/providers.constants';
import { SCHOOLS } from '../../providers/providers.constants';
import { NativeProvider } from '../native';
/*
  Generated class for the DownloadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DownloadProvider {

  constructor(
    private file: File,
    private storage: Storage,
    private nativePro: NativeProvider
  ) { }

  getFileType(fileName: string): string {
    return fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
  }

  getFileMimeType(fileType: string): string {
    let mimeType: string = '';
    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      case 'csv':
        mimeType = 'application/octet-stream';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
  }


  get downloadPath() {
    if (this.nativePro.isAndroid) {
      return this.file.externalDataDirectory;
    } else if (this.nativePro.isIos) {
      return this.file.documentsDirectory;
    }
  }


  setdownloads(param) {
    this.getdownloads(param.isAll).then(res => {
      if (!res) {
        let arr: any[] = [];
        arr.push(param);
        this.save(arr, param.isAll)
      } else {
        res.unshift(param);
        this.save(res, param.isAll);
      }
    })
  }


  //存储
  save(data, isAll) {
    isAll ? this.storage.set(DOWNLOAD, data) : this.storage.set(SCHOOLS, data);
  }

  getdownloads(isAll) {
    return isAll ? this.storage.get(DOWNLOAD) : this.storage.get(SCHOOLS);
  }

  del(param) {
    this.getdownloads(param.isAll).then(res => {
      res.forEach((v, i) => {
        if (v.nativeUrl == param.nativeUrl) {
          res.splice(i, 1);
          param.isAll ? this.storage.set(DOWNLOAD, res) : this.storage.set(SCHOOLS, res);
        }
      })
    })
  }

}
