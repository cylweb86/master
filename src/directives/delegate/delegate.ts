import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the HookDirective directive.
 * Leo Zhang 2018-04
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[delegate]' // Attribute selector
})
export class DelegateDirective {

  @Output() onChanged: EventEmitter < any > = new EventEmitter < any > ();

  /**
   * 设置为true时点击事件将会变得更活泼敏感，忽视value的差异;
   */
  @Input() alive: boolean;
  /**
   * 非点击时是否回调
   */
  @Input() passive: boolean;

  /**
   * 埋点名称
   */
  @Input() event: string;

  /**
   * 创建一个跟随点击目标移动的状态块<div class='marker'><marker></marker></div>
   */
  @Input() marker: string;

  /**
   * 动画过度时间默认230,
   */
  @Input() duration: number = 260;


  @Output() valueChange: EventEmitter < any > = new EventEmitter < any > ();

  /*
   *委托目标的Tag Name,绑定在父级上，可通过event.index 获取目标索引
   */
  @Input() set delegate(selector: string) {
    this.selector = selector;
    if (!selector || !this.currentTarget) return;
    this.initiliaze(selector);
  }

  /**
   * 是否防抖
   */
  @Input() debounce: string;

  /**
   * 值
   */
  @Input() set value(val: string) {
    if (val === undefined || val == this.val) return;
    if (!this.currentTarget) {
      this.init = String(val);
      return;
    }
    this.changeState(String(val));
  }

  private isClicked: boolean;
  private selector: string;
  private val: string;
  private values: string[] = [];
  private markerElement: HTMLElement;
  private init: string;
  private tagName: string;

  private targets: HTMLElement[];
  private enterSubscribe: any;
  private leaveSubscribe: any;
  private listen: any;
  private islisten: boolean;
  private currentTarget: any;
  private clicked: boolean = false;
  constructor(
    private viewCtrl: ViewController,
    private el: ElementRef,
    private render: Renderer2) {}

  ngAfterViewInit() {
    this.currentTarget = this.el.nativeElement;
    if (this.marker) {
      this.markerElement = document.createElement("div");
      this.markerElement.className = this.marker;
      //this.markerElement.innerHTML = `<${this.marker}></${this.marker}>`;
      this.currentTarget.insertBefore(this.markerElement, this.currentTarget.firstElementChild);
    }
    this.initiliaze(this.selector);
    setTimeout(() => this.value = this.init, 60);

    this.subscribe();
  }

  subscribe() {
    this.bind();
    this.leaveSubscribe = this.viewCtrl.didLeave.subscribe((res) => {
      this.leaveSubscribe.unsubscribe();
      this.unbind();
      this.enterSubscribe = this.viewCtrl.didEnter.subscribe((res) => {
        this.ngOnDestroy();
        this.subscribe();
      });
    });
  }

  initiliaze(selector: string) {
    if (!selector) return;
    this.values = [];
    let strs = selector.split(' ');
    this.tagName = strs[strs.length - 1].toUpperCase();
    this.reset();

  }

  private reset() {
    this.targets = this.currentTarget.querySelectorAll(this.selector.toLowerCase() + ':not([disabled])');
    this.setValues();
  }
  private setValues() {
    this.values.length = 0;

    for (let i = 0; i < this.targets.length; i++) this.values.push(this.targets[i].getAttribute('value'));
  }

  private bind() {
    if (this.islisten) return;
    this.listen = this.render.listen(this.currentTarget, 'click', (e) => this.action(e.target));
    this.islisten = true;
  }

  private action(target) {
    if (this.debounce) {
      if (this.isClicked) return;
      this.isClicked = true;
      setTimeout(() => this.isClicked = false, 1000);
    }
    while (target !== this.currentTarget) {
      if (target.tagName == this.tagName) {
        let val = target.getAttribute('value');
        this.clicked = true;
        if (val != this.val) {
          this.value = val;
        } else {
          this.alive && this.onChanged.emit({ target: target, value: val, clicked: true, alive: true });
        }
        break;
      }
      target = target.parentNode;
    }
  }

  private changeState(val: string) {
    this.currentTarget.contains(this.targets[0]) || this.reset();
    let lastIndex = this.values.indexOf(this.val),
      activeIndex = this.values.indexOf(val);
    if (activeIndex < 0) {
      this.setValues();
      activeIndex = this.values.indexOf(val);
    }
    //清除mark状态
    if (activeIndex < 0) {
      this.val = val;
      this.marker && this.render.setStyle(this.markerElement, 'opacity', 0);
      return;
    }
    this.val = val;
    this.valueChange.emit(val);
    this.targets[lastIndex] && this.render.removeClass(this.targets[lastIndex], 'checked');
    this.targets[activeIndex] && this.render.addClass(this.targets[activeIndex], 'checked');
    this.marker && this.setMarker(this.targets[activeIndex]);
    this.passive && !this.clicked || this.onChanged.emit({ target: this.targets[activeIndex], value: val, clicked: this.clicked, index: activeIndex });
    this.clicked = false;
  }

  private setMarker(target: HTMLElement) {
    let targetRect = target.getBoundingClientRect(),
      currentRect = this.currentTarget.getBoundingClientRect(),
      top = targetRect.top - currentRect.top,
      left = targetRect.left - currentRect.left;
    //this.setAttr(this.markerElement);
    this.render.setAttribute(this.markerElement, 'style', `width:${target.offsetWidth}px;height:${target.offsetHeight}px;transform:translate3d(${left}px,${top}px,100px)`);
    this.render.addClass(this.markerElement, 'moving');
    let child = this.markerElement.firstChild;
    child ? this.markerElement.replaceChild(target.cloneNode(true), child) : this.markerElement.appendChild(target.cloneNode(true));
    setTimeout(() => this.render.removeClass(this.markerElement, 'moving'), this.duration);
  }


  private unbind() {
    if (!this.islisten) return;
    typeof this.listen === "function" && this.listen();
    this.islisten = false;
  }

  ngOnDestroy() {
    this.enterSubscribe && this.enterSubscribe.unsubscribe();
    this.leaveSubscribe && this.leaveSubscribe.unsubscribe();
    this.unbind();
  }

}
