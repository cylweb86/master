import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotosViewerPage } from './photosviewer';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import Swiper from 'swiper/dist/js/swiper.js';
@NgModule({
  declarations: [
    PhotosViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosViewerPage),
    DirectivesModule,
    ComponentsModule,
  ]
})
export class PhotosViewerPageModule {}
