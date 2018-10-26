import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SheetPage} from './sheet';
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
@NgModule({
  declarations: [
    SheetPage
  ],
  imports: [
    IonicPageModule.forChild(SheetPage),
    PipesModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class SheetmessagesPageModule {}
