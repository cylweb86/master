import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolsPage } from './schools';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    SchoolsPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolsPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class SchoolsPageModule {}
