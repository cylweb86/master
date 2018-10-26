import { Injectable } from '@angular/core';
import { HttpProvider } from '../http';
/*
  Generated class for the PasswordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PasswordProvider {

  constructor(public http: HttpProvider) {};


  /**
   * 发送验证码
   */
  sendmsg(data){
    return this.http.get('index/SendBackCode',data)
  }

  /**
   * 校验验证码
   */
  verifymsg(data){
    return this.http.post('index/CheckBackCode',data)
  }

  /**
   * 忘记密码时修改密码
   */
  changepwd(data){
    return this.http.post('index/ChangePassWord',data)
  }

  /**
   * 配置信息
   */
  config(data ?){
    return this.http.get('index/Config',data)
  }


  /**
   * 获取最新app信息
   */
  version(data){
    return this.http.get('index/AppInfo',data)
  }
  
   /**
   * 登录后修改密码
   */
  loginedChangepwd(data){
    return this.http.post('usercenter/changepwd',data)
  }
}
