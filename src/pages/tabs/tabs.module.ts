import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { HomePageModule } from '../../pages/home/home.module';
import { TapPressDirective } from '../../directives/tappress.directive';
@NgModule({
  declarations: [
    TabsPage,
    TapPressDirective
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    HomePageModule
  ]
})
export class TabsModule { }
