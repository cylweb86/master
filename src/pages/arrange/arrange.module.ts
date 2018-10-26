import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrangePage } from './arrange';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    ArrangePage,
  ],
  imports: [
    IonicPageModule.forChild(ArrangePage),
    DirectivesModule,
    PipesModule,
    ComponentsModule
  ],
})
export class ArrangePageModule {}
