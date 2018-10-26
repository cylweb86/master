import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandlesPage } from './handles';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    HandlesPage,
  ],
  imports: [
    IonicPageModule.forChild(HandlesPage),
    DirectivesModule,
    ComponentsModule,
    PipesModule
  ],
})
export class HandlesPageModule { }
