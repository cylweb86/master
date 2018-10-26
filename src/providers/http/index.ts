import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { HttpHandler } from "./handler";
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()

export class HttpProvider {
  version: string = '1.4.0';
  isNative: boolean;
  domin: string = 'http://business-ui.septnet.cn/';
  get: Function;
  post: Function;
  token: string = '';
  transfer: FileTransferObject;
  constructor(
    private http: Http,
    private nativeHttp: HTTP,
    private handleService: HttpHandler,
    private platform: Platform,
    private fileTransfer: FileTransfer,
  ) {
    this.isNative = this.platform.is('mobile') && !this.platform.is('mobileweb');
    this.initialize(this.version);
  }


  setToken(token: string) {
    this.token = token;
  }

  enableSSL(): Promise<any> {
    if (this.isNative && this.domin.indexOf('https') > -1) {
      this.nativeHttp.enableSSLPinning(true);
      return this.nativeHttp.acceptAllCerts(true);
    } else {
      return Promise.resolve();
    }
  }


  initialize(version: string) {
    this.setVersion(version);
    if (this.isNative) {
      //真机环境
      this.get = this.nativeGet;
      this.post = this.nativePost;
    } else {
      //web环境
      this.domin = window.location.origin + '/';
      this.get = this.webGet;
      this.post = this.webPost;
    }
    return this.enableSSL();
  }

  setVersion(version: string) {
    this.version = version;
  }

  private url(url: string) {
    return this.domin + url;
  }

  uploadFile(url, body, filePath, fileName) {
    this.transfer = this.transfer || this.fileTransfer.create();
    let options: FileUploadOptions = {
      headers: this.headers(),
      params: { guid: body.guid, fileName }
    }
    return this.transfer.upload(filePath, encodeURI(`${this.domin}/${url}`), options).catch(err => this.catchError(err));
  }


  downloadFile(url, filePath, body?) {
    let ssl = url.indexOf('https://') > -1;
    if (ssl) {
      return this.nativeHttp.downloadFile(url, body || {}, {}, filePath)
    } else {
      return this.nativeHttp.enableSSLPinning(false)
        .then(res => {
          this.domin.indexOf('https://') > -1 && setTimeout(() => this.nativeHttp.enableSSLPinning(true), 800);
          return this.nativeHttp.downloadFile(url, body || {}, {}, filePath);
        })
    }
  }



  private nativePost(url: string, body?: any) {
    body = body || {};
    if (url.indexOf('http') > -1) {
      this.nativeHttp.setDataSerializer('json');
    } else {
      url = this.url(url);
      this.nativeHttp.setDataSerializer('urlencoded');
    }
    return this.nativeHttp.post(url, this.serializer(body), { Token: this.token, Version: this.version })
      .then(res => this.handleService.json(res))
      .catch(err => this.catchError(err));
  }

  private nativeGet(url: string, body?: any) {
    body = body || {};
    if (url.indexOf('http') == -1) {
      url = this.url(url);
    }
    this.nativeHttp.setDataSerializer('json');
    return this.nativeHttp.get(url + '?' + this.toParams(body), {}, { Token: this.token, Version: this.version })
      .then(res => this.handleService.json(res))
      .catch(err => this.catchError(err));
  }

  private webGet(url: string, body?: any) {
    body = body || {};
    if (url.indexOf('http') == -1) {
      url = this.url(url);
    }
    let headers = new Headers()
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Version', this.version);
    this.token && headers.append('Token', this.token);
    return this.http.get(url + '?' + this.toParams(body), { headers })
      .toPromise()
      .then(res => this.handleService.json(res))
      .catch(err => this.catchError(err));
  }

  headers() {
    let header: any = { Version: this.version };
    if (this.token) header.Token = this.token;
    return header;
  }

  private webPost(url: string, body?: any) {
    let params: any;
    body = body || {};
    let headers = new Headers();
    if (url.indexOf('http') > -1) {
      headers.append('Content-Type', 'application/json; charset=utf-8');
      params = this.serializer(body);
    } else {
      params = this.toParams(body);
      url = this.url(url);
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    }
    headers.append('Version', this.version);
    this.token && headers.append('Token', this.token);
    return this.http.post(url, params, { headers })
      .toPromise()
      .then(res => this.handleService.json(res))
      .catch(err => this.catchError(err));
  }

  private toParams(obj?: any) {
    if (!obj) return;
    let ret = [],
      keys = Object.keys(obj);
    keys.forEach(key => obj[key] === undefined || ret.push(this.toQueryPair(key, typeof obj[key] == 'object' ? JSON.stringify(obj[key]) : obj[key])));
    return ret.join('&');
  }

  private serializer(obj?: any) {
    if (!obj) return;
    let sobj = {},
      keys = Object.keys(obj);
    keys.forEach(key => {
      if (obj[key] !== undefined) {
        sobj[key] = typeof obj[key] == 'object' ? JSON.stringify(obj[key]) : obj[key];
      }
    });
    return sobj;
  }

  private toQueryPair(key, value) {
    if (typeof value === undefined) return;
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

  private catchError(err = { message: '网络延时，请稍后再试' }) {
    err.message = err.message || '网络延时，请稍后再试';
    this.handleService.handleError(err);
  }

}
