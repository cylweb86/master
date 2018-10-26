import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SdataPage } from './sdata';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    SdataPage,
  ],
  imports: [
    IonicPageModule.forChild(SdataPage),
    PipesModule,
    ComponentsModule,
    DirectivesModule
  ],
})
export class SdataPageModule { }
