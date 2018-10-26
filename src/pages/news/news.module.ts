import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    DirectivesModule
  ],
})
export class NewsPageModule { }
