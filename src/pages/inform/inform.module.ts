import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformPage } from './inform';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    InformPage,
  ],
  imports: [
    IonicPageModule.forChild(InformPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class InformPageModule { }
