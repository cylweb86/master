import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPage } from './forget';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    ForgetPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPage),
    ComponentsModule,
    DirectivesModule,
  ]
})
export class ForgetPageModule {}
