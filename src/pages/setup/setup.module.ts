import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupPage } from './setup';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    SetupPage,
  ],
  imports: [
    IonicPageModule.forChild(SetupPage),
    ComponentsModule,
    DirectivesModule,
  ],
})
export class SetupPageModule {}
