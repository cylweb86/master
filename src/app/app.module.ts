import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

enableProdMode();
/*
 * native plugins
 */
import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';
import { FilePath } from '@ionic-native/file-path';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AppVersion } from '@ionic-native/app-version';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet';
import { Market } from '@ionic-native/market';
import { ImagePicker } from '@ionic-native/image-picker';
import { Clipboard } from '@ionic-native/clipboard';
import { Keyboard } from '@ionic-native/keyboard';
import { FileTransfer } from '@ionic-native/file-transfer';
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 *Providers
 */
import { ComponentsModule } from '../components/components.module';
import { HttpProvider } from '../providers/http';
import { HttpHandler } from '../providers/http/handler';
import { UserProvider } from '../providers/user';
import { NativeProvider } from '../providers/native';
import { PasswordProvider } from '../providers/password/password';
import { AppProvider } from '../providers/app/app';
import { HardbackProvider } from '../providers/app/hardback';
import { UpgradeProvider } from '../providers/app/upgrade';
import { SheetProvider } from '../providers/sheet/sheet';
import { MessageProvider } from '../providers/message/message';
import { DataProvider } from '../providers/data/data';
import { DownloadProvider } from '../providers/download/download';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ChartProvider } from '../providers/chart/chart';
import { UnionProvider } from '../providers/union/union';
import { HandleProvider } from '../providers/handle/handle';
import { ArrangeProvider } from '../providers/arrange/arrange';
import { TodayProvider } from '../providers/today/today';
import { NewsProvider } from '../providers/news/news';
import { BrowserProvider } from '../providers/browser/browser';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'ios',
      backButtonIcon: 'ios-arrow-round-back',
      tabsPlacement: 'bottom',
      modalEnter: 'modal-md-slide-in',
      modalLeave: 'modal-md-slide-out',
      tabsHideOnSubPages: true,
      spinner: 'ios-small',
      swipeBackEnabled: false
    }),
    ComponentsModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    /*
     * native plugins
     */
    SplashScreen,
    Toast,
    Dialogs,
    StatusBar,
    HTTP,
    SpinnerDialog,
    AppVersion,
    FileOpener,
    File,
    FilePath,
    ActionSheet,
    Camera,
    Market,
    Clipboard,
    ScreenOrientation,
    CallNumber,
    Device,
    SocialSharing,
    ThemeableBrowser,
    /*
     * request service
     */
    HttpProvider,
    HttpHandler,
    UserProvider,
    NativeProvider,
    AppProvider,
    HardbackProvider,
    UpgradeProvider,
    SheetProvider,
    PasswordProvider,
    MessageProvider,
    ImagePicker,
    Keyboard,
    FileTransfer,
    DataProvider,
    DownloadProvider,
    ChartProvider,
    UnionProvider,
    HandleProvider,
    ArrangeProvider,
    TodayProvider,
    NewsProvider,
    BrowserProvider
  ]
})
export class AppModule { }
