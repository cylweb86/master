import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrendPage } from './trend';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    TrendPage,
  ],
  imports: [
    IonicPageModule.forChild(TrendPage),
    DirectivesModule,
    PipesModule,
    ComponentsModule
  ],
})
export class TrendPageModule { }
