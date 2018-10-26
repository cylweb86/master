import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelativesPage } from './relatives';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    RelativesPage,
  ],
  imports: [
    IonicPageModule.forChild(RelativesPage),
    DirectivesModule,
    ComponentsModule,
    PipesModule
  ],
})
export class RelativesPageModule { }
