import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidationPage } from './validation';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ValidationPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidationPage),
    ComponentsModule,
    DirectivesModule,
  ],

})
export class ValidationPageModule {}
