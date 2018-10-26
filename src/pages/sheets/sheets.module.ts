import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SheetsPage } from './sheets';
import { SheetProvider } from '../../providers/sheet/sheet';
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    SheetsPage,
  ],
  imports: [
    IonicPageModule.forChild(SheetsPage),
    PipesModule,
    ComponentsModule,
    DirectivesModule
  ],
  providers: [
    SheetProvider,
  ]
})
export class SheetsPageModule {}
