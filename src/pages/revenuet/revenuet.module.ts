import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RevenuetPage } from './revenuet';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    RevenuetPage,
  ],
  imports: [
    IonicPageModule.forChild(RevenuetPage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class RevenuetPageModule { }
