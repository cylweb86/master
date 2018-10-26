import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandlePage } from './handle';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    HandlePage,
  ],
  imports: [
    IonicPageModule.forChild(HandlePage),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
})
export class HandlePageModule {}
