import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsercenterPage } from './usercenter';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    UsercenterPage,
  ],
  imports: [
    IonicPageModule.forChild(UsercenterPage),
    DirectivesModule
  ],
})
export class UsercenterPageModule {}
