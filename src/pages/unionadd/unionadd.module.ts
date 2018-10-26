import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnionaddPage } from './unionadd';
import { ComponentsModule } from '../../components/components.module'
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    UnionaddPage,
  ],
  imports: [
    IonicPageModule.forChild(UnionaddPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class UnionaddPageModule { }
