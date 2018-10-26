import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SubmitonComponent } from './submiton/submiton';
import { Loading } from './loading/loading';
import { DirectivesModule } from '../directives/directives.module';
import { UploadimgComponent } from './uploadimg/uploadimg'
import { LazyLoader } from './lazyloader/lazyloader';
import { TelComponent } from './tel/tel';
import { EchartComponent } from './echart/echart';
@NgModule({
  declarations: [
    SubmitonComponent,
    Loading,
    UploadimgComponent,
    LazyLoader,
    TelComponent,
    EchartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    SubmitonComponent,
    Loading,
    UploadimgComponent,
    LazyLoader,
    TelComponent,
    EchartComponent
  ],
})
export class ComponentsModule { }
