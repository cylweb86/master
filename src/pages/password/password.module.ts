import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordPage } from './password';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    PasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordPage),
    DirectivesModule
  ],
})
export class PasswordPageModule {}
