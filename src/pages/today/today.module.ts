import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayPage } from './today';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    TodayPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayPage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class TodayPageModule { }
