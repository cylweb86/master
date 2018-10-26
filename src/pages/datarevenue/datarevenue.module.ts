import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatarevenuePage } from './datarevenue';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    DatarevenuePage,
  ],
  imports: [
    IonicPageModule.forChild(DatarevenuePage),
    PipesModule,
    DirectivesModule
  ],
})
export class DatarevenuePageModule {}
