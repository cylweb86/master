import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StestPage } from './stest';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    StestPage,
  ],
  imports: [
    IonicPageModule.forChild(StestPage),
    PipesModule,
    DirectivesModule
  ],
})
export class StestPageModule {}
