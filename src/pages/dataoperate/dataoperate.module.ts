import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataoperatePage } from './dataoperate';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    DataoperatePage,
  ],
  imports: [
    IonicPageModule.forChild(DataoperatePage),
    PipesModule,
    DirectivesModule
  ],
})
export class DataoperatePageModule {}
