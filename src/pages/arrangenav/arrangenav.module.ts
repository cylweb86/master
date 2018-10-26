import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrangenavPage } from './arrangenav';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
@NgModule({
  declarations: [
    ArrangenavPage,
  ],
  imports: [
    IonicPageModule.forChild(ArrangenavPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class ArrangenavPageModule { }
