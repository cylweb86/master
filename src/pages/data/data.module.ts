import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataPage } from './data';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    DataPage,
  ],
  imports: [
    IonicPageModule.forChild(DataPage),
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
})
export class DataPageModule {}
