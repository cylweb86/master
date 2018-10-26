import { NgModule } from '@angular/core';
import { InputDirective } from './input/input';
import { ImgviewerDirective } from './imgviewer/imgviewer'
import { DelegateDirective } from './delegate/delegate';
import { AreaDirective } from './area/area';
import { EventDirective } from './event';
@NgModule({
  declarations: [
    InputDirective,
    ImgviewerDirective,
    DelegateDirective,
    AreaDirective,
    EventDirective
  ],
  exports: [
    InputDirective,
    ImgviewerDirective,
    DelegateDirective,
    AreaDirective,
    EventDirective
  ]
})
export class DirectivesModule { }
