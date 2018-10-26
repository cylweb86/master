import { Directive, ElementRef, Renderer, Output, EventEmitter, Input } from '@angular/core';
@Directive({
    selector: '[check]',
})
export class TapPressDirective {
    tabsElement: any;
    checkValue: boolean;
    @Output() checkChange = new EventEmitter();
    @Input() hasreq;
    @Input()
    get check() {
        return this.checkValue;
    }
    set check(val: boolean) {
        if (this.checkValue == val) return;
        if (!val && this.tabsElement) {
            this.tabsElement[1].firstElementChild.className = 'tab-button-icon icon icon-ios ion-ios-inews';
        }
        this.checkValue = val;
        this.checkChange.emit(this.checkValue);
    }
    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ) { }
    ngAfterViewInit() {
        this.tabsElement = this.el.nativeElement.querySelectorAll('.tabbar .tab-button');
        this.addTouchEvent();
    }
    addTouchEvent() {
        for (let i = 0; i < this.tabsElement.length; i++) {
            this.renderer.listen(this.tabsElement[i], 'touchstart', event => {
                if (i == 1) {
                    if (this.tabsElement[1].getAttribute("aria-selected") != 'true' && this.hasreq) return;
                    this.tabsElement[1].firstElementChild.className = 'tab-button-icon icon icon-ios ion-ios-sync rotate360';
                    this.check = true;
                } else {
                    this.tabsElement[1].firstElementChild.className = 'tab-button-icon icon icon-ios ion-ios-inews';
                }
            })
        }
    }
}