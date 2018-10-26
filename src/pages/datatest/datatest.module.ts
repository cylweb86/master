import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatatestPage } from './datatest';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    DatatestPage,
  ],
  imports: [
    IonicPageModule.forChild(DatatestPage),
    PipesModule,
    DirectivesModule 
  ],
})
export class DatatestPageModule {}
