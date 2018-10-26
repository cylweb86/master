import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssuePage } from './issue';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    IssuePage
  ],
  imports: [
    IonicPageModule.forChild(IssuePage),
    ComponentsModule,
    DirectivesModule
  ]
})
export class IssuePageModule {}
