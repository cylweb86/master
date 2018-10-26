import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfviewPage } from './pdfview';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    PdfviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PdfviewPage),
    PdfViewerModule,
    DirectivesModule
  ],
})
export class PdfviewPageModule { }
