import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrangesPage } from './arranges';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    ArrangesPage,
  ],
  imports: [
    IonicPageModule.forChild(ArrangesPage),
    DirectivesModule,
    ComponentsModule,
    PipesModule
  ],
})
export class ArrangesPageModule { }
