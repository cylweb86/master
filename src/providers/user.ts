import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpProvider } from "./http";
import { USERINFO, ACCOUNT, MAXAREA, SELFINFO } from './providers.constants';
import { HttpHandler } from "./http/handler";
import { UpgradeProvider } from './app/upgrade';
@Injectable()
export class UserProvider {
  constructor(
    private http: HttpProvider,
    private storage: Storage,
    private httpHandler: HttpHandler,
    private upgradePro: UpgradeProvider,
  ) { }

  //初始数据
  initialize(userInfo, login: any) {
    //检测更新
    this.setLogin(login);
    userInfo && this.http.setToken(userInfo.token);
    this.setUserInfo(userInfo);
    this.selfInfo();
    this.initsalesman();
    this.upgradePro.getMachineVerison().then(res => {
      this.upgradePro.setVersion(res);
      setTimeout(() => this.upgradePro.checkUpdate(false), 3000);
    })
  }

  login(user) {
    return this.http.post('login', user).then(res => {
      this.initialize(res, user);
      return res;
    })
  }

  selfInfo() {
    this.http.post('Usercenter/info').then(res => {
      //let arr: any = [];
      //let strName: any;
      let strCode: any;
      // if (res.AreaName) {
      //   res.AreaName.forEach(v => {
      //     arr.push(v.join(''));
      //   })
      //   if (arr.length == 1) {
      //     strName = arr.toString().trim();
      //   } else {
      //     strName = arr.join('、');
      //   }
      // }

      if (res.Area) {
        strCode = res.Area.join();
      }
      //this.setSelfInfo({ areaName: strName, area: strCode, phone: res.Phone, name: res.Name, role: res.Role });
      this.setSelfInfo({ area: strCode, phone: res.Phone, name: res.Name, role: res.Role });
    }).catch(ex => ex);
  }

  initsalesman() {
    this.storage.get(MAXAREA).then(res => {
      if (res) {
        this.storage.remove(MAXAREA);
        this.initSales();
      } else {
        this.initSales();
      }
    }).catch(ex => ex);
  }

  initSales() {
    //上月时间
    let nowdays: any = new Date();
    let year: any = nowdays.getFullYear();
    let month: any = nowdays.getMonth();
    if (month == 0) {
      month = 12;
      year = year - 1;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let time: string = year + month;
    //存最大的级别的text 大区 省 市 区县 四个级别
    let arr: any[] = [];
    this.http.post('data/userArea').then(res => {
      if (res.length > 1) {
        return this.storage.set(MAXAREA, { code: '', value: '全部', child: res, time });
      } else {
        this.loop(res, arr, time)
      }
    })
  }



  loop(res, arr, time) {
    res.forEach(item => {
      arr.push(item.text);
      if (item.child.length > 1) {
        return this.storage.set(MAXAREA, { code: item.value, value: arr.join(' '), child: item.child, time })
      } else if (item.child.length == 0) {
        return this.storage.set(MAXAREA, { code: item.value, value: arr.join(' '), child: item.child, time })
      } else {
        this.loop(item.child, arr, time);
      }
    })
  }

  logout() {
    this.storage.remove(USERINFO);
    return this.getLogin().then(res => {
      this.storage.remove(ACCOUNT);
      return res && this.setLogin({ usercode: res.usercode }).then(res => this.httpHandler.handleAuth());
    });
  }


  getMaxArea() {
    return this.storage.get(MAXAREA);
  }

  setLogin(login) {
    return this.storage.set(ACCOUNT, login);
  }

  getLogin() {
    return this.storage.get(ACCOUNT);
  }

  setUserInfo(userInfo) {
    return this.storage.set(USERINFO, userInfo)
  }

  getUserInfo(): Promise<any> {
    return this.storage.get(USERINFO);
  }

  setSelfInfo(self) {
    this.storage.set(SELFINFO, self);
  }

  getSelfInfo() {
    return this.storage.get(SELFINFO);
  }
}
