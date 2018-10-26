import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnionsPage } from './unions';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    UnionsPage,
  ],
  imports: [
    IonicPageModule.forChild(UnionsPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
})
export class UnionsPageModule { }
