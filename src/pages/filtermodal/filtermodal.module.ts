import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltermodalPage } from './filtermodal';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    FiltermodalPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltermodalPage),
    PipesModule,
    DirectivesModule
  ],
})
export class FiltermodalPageModule {}
