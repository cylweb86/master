import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformsPage } from './informs';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    InformsPage,
  ],
  imports: [
    IonicPageModule.forChild(InformsPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
})
export class InformPageModule {}
