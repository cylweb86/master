import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SheetnavPage } from './sheetnav';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    SheetnavPage,
  ],
  imports: [
    IonicPageModule.forChild(SheetnavPage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class SheetnavPageModule {}
