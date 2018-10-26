import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestrendPage } from './testrend';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    TestrendPage,
  ],
  imports: [
    IonicPageModule.forChild(TestrendPage),
    DirectivesModule,
    PipesModule,
    ComponentsModule
  ],
})
export class TestrendPageModule { }
