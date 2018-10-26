import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
// import { Device } from '@ionic-native/device';
/**
 * Generated class for the HookDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[touch],[event]:not([touch])' // Attribute selector
})
export class EventDirective {
  @Output('touch') touch: EventEmitter<any> = new EventEmitter<any>();
  @Input() event: string;
  enterSubscribe: any;
  leaveSubscribe: any;
  listen: any;
  islisten: boolean;
  constructor(
    private viewCtrl: ViewController,
    private el: ElementRef,
    private render: Renderer2
    // private device: Device
  ) { }
  ngAfterViewInit() {
    this.bind();
    this.leaveSubscribe = this.viewCtrl.didLeave.subscribe((res) => {
      this.leaveSubscribe.unsubscribe();
      this.unbind();
      this.enterSubscribe = this.viewCtrl.didEnter.subscribe((res) => {
        this.ngOnDestroy();
        this.ngAfterViewInit();
      });
    });
  }

  private bind() {
    if (this.islisten) return;
    this.listen = this.render.listen(this.el.nativeElement, 'click', (e) => {
      this.touch.observers.length && this.touch.next(e);
      // if (this.event) {
      //   console.log(this.event, 'this.event');
      //   console.log(this.device, 'this.device');
      // }
    });
    this.islisten = true;
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
