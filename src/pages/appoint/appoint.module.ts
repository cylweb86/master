import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointPage } from './appoint';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    AppointPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointPage),
    PipesModule,
    ComponentsModule
  ],
})
export class AppointPageModule { }
