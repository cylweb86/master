import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SystemPage } from './system';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    SystemPage,
  ],
  imports: [
    IonicPageModule.forChild(SystemPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class SystemPageModule { }
