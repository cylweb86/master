import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnionPage } from './union';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    UnionPage
  ],
  imports: [
    IonicPageModule.forChild(UnionPage),
    DirectivesModule,
    ComponentsModule,
    PipesModule
  ],
})
export class UnionPageModule { }
