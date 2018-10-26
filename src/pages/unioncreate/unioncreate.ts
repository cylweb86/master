import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, ViewController } from 'ionic-angular';
import { NativeProvider } from '../../providers/native';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { localtime } from '../../utils/common';
import { NOTICE_PAGE, UNION_PAGE } from '../pages.constants';
import { UnionProvider } from '../../providers/union/union';

/**
 * Generated class for the UnioncreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unioncreate',
  templateUrl: 'unioncreate.html',
})
export class UnioncreatePage {
  @ViewChild('datetime') datetime: DateTime;
  pages: any = {
    notice: NOTICE_PAGE
  }
  dateModal: boolean = true;
  modal: boolean = false;
  formgroup: FormGroup;
  more: boolean = false;
  // 时间相关
  event = {
    min: localtime('fd'),
    st: '',
    et: '',
    middle: '',
    time: '',
    max: localtime('yadd')
  }
  // 弹框相关
  select = {
    cache: '',
    etype: '原组织代码考试',
    pay: '收费',
    support: '申请技术支持',
    mulexam: '联考',
    option: ['原组织代码考试', '新建申请'],
    grade: ''
  }
  //联动选项
  link = {
    isrucode: true,
    ispay: true,
    issupport: true
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativePro: NativeProvider,
    private unionPro: UnionProvider,
    private viewCtrl: ViewController,
    formGroup: FormBuilder
  ) {
    let validators = ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      controls = {
        chargeStd: ['', Validators.compose([Validators.maxLength(500)])],
        techSuptDesc: ['', Validators.compose([Validators.maxLength(500)])],
        platform: validators,
        examName: validators,
        orgCode: ['', Validators.compose([Validators.maxLength(9)])],
        contact: validators,
        contactWay: ['', Validators.compose([Validators.required, Validators.pattern(/^1[0-9]{10}$|^0\d{2,3}-\d{7,8}$|^0\d{2,3}\d{7,8}$/)])],
        schoolNum: ['', Validators.compose([Validators.maxLength(500)])],
        studentNum: ['', Validators.compose([Validators.maxLength(500)])]
      }
    this.formgroup = formGroup.group(controls);
  }


  alert(event) {
    this.select.cache = event;
    this.more = false;
    if (event == '1') {
      this.select.option = ['原组织代码考试', '新建申请'];
    } else if (event == '2') {
      this.select.option = ['免费', '收费', '协议年费'];
    } else if (event == '3') {
      this.select.option = ['不申请', '申请技术支持', '申请技术协作'];
    } else if (event == '4') {
      this.select.option = ['联考', '约考'];
    } else {
      this.more = true;
      this.select.option = ['高三', '高二', '高一', '初三', '初二', '初一', '六年级', '五年级', '四年级', '三年级', '二年级', '一年级'];
    }
    this.modal = true;
  }

  submit() {
    if (this.link.isrucode && this.formgroup.value.orgCode.length != 9) return this.nativePro.toast('组织代码必须为9位');
    if (this.link.ispay && !this.formgroup.value.chargeStd) return this.nativePro.toast('请填写收费标准');
    if (this.link.issupport && !this.formgroup.value.techSuptDesc) return this.nativePro.toast('请填写内容描述');
    if (!this.select.grade) return this.nativePro.toast('请选择年级');
    if (new Date(this.event.st) > new Date(this.event.et)) return this.nativePro.toast('结束时间不能小于开始时间');
    if (!this.link.isrucode) {
      this.formgroup.value.orgCode = '';
    }
    if (!this.link.issupport) {
      this.formgroup.value.techSuptDesc = '';
    }
    if (!this.link.ispay) {
      this.formgroup.value.chargeStd = '';
    }
    this.nativePro.showLoading('提交中', 10000);
    let examType = ['原组织代码考试', '新建申请'].findIndex(v => v == this.select.etype) + 1;
    let chargeType = ['免费', '收费', '协议年费'].findIndex(v => v == this.select.pay);
    let techSupt = ['不申请', '申请技术支持', '申请技术协作'].findIndex(v => v == this.select.support);
    let channel = ['联考', '约考'].findIndex(v => v == this.select.mulexam) + 1;
    let grade = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'].findIndex(v => v == this.select.grade) + 1;
    let param = { ...this.formgroup.value, examTimeStart: this.event.st, examTimeEnd: this.event.et, examType, chargeType, techSupt, channel, grade };
    this.unionPro.unionCreate(param).then(res => {
      this.unionPro.send({ createTime: localtime('fd'), examName: this.formgroup.value.examName, ...res, hasNewReply: false, staName: '待审核', status: 1 });
      this.nativePro.hideLoading();
      this.navCtrl.push(UNION_PAGE, res).then(res => {
        this.navCtrl.remove(this.viewCtrl.index, 1);
      })
    }).catch(ex => {
      this.nativePro.hideLoading();
      if (ex && ex.message) {
        this.nativePro.toast(ex.message);
      }
    })
  }

  time(event) {
    this.event.middle = event;
    this.datetime.open();
  }

  picker() {
    this.event.middle == '1' ? this.event.st = this.event.time : this.event.et = this.event.time;
  }

  changed(event) {
    if (this.select.cache == '1') {
      if (event.value == '新建申请') {
        this.link.isrucode = false;
      } else {
        this.link.isrucode = true;
      }
      this.select.etype = event.value;
    } else if (this.select.cache == '2') {
      if (event.value == '免费') {
        this.link.ispay = false;
      } else {
        this.link.ispay = true;
      }
      this.select.pay = event.value;
    } else if (this.select.cache == '3') {
      if (event.value == '不申请') {
        this.link.issupport = false;
      } else {
        this.link.issupport = true;
      }
      this.select.support = event.value;
    } else if (this.select.cache == '4') {
      this.select.mulexam = event.value;
    } else {
      this.select.grade = event.value;
    }
    setTimeout(() => {
      this.modal = false;
    }, 100)
  }

  ionViewWillLeave() {
    this.dateModal = false;
  }

  ionViewWillEnter() {
    this.dateModal = true;
  }
}
