import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { VALIDATION_PAGE } from '../pages.constants';
@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html'
})


export class ForgetPage {
  checked: boolean = true;
  phone:string='';
  authForm:any=undefined;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}

  codeupdate(event){
   this.checked = /^1[0-9]{10}$/.test(event.value);
   this.authForm = this.checked ? false : undefined;
  }
  /**
   *发送验证码
   */

   sendcode() {
    this.authForm = undefined;
    this.navCtrl.push(VALIDATION_PAGE,{phone:this.phone}).then(res=>{
      this.authForm = false;
    });
  }

}
