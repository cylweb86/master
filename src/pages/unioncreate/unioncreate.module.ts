import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnioncreatePage } from './unioncreate';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    UnioncreatePage,
  ],
  imports: [
    IonicPageModule.forChild(UnioncreatePage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class UnioncreatePageModule { }
