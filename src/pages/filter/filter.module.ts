import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPage } from './filter';
import { DirectivesModule } from '../../directives/directives.module';
import { MultiPickerModule } from 'ion-multi-picker';
@NgModule({
  declarations: [
    FilterPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPage),
    DirectivesModule,
    MultiPickerModule
  ],
})
export class FilterPageModule { }
