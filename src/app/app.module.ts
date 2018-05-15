import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Loteria } from './app.component';
import { NgxErrorsModule } from  '@ultimate/ngxerrors';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ChartsModule } from 'ng2-charts';
// Paginas
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { JuegoPage } from '../pages/juego/juego';
import { UnirsePage } from "../pages/unirse/unirse";
import { CrearPartidaPage } from "../pages/crear-partida/crear-partida";
import { RecordPage } from "../pages/record/record";
import { ConfigPage } from "../pages/config/config";
import { LoginPage } from "../pages/login/login";
import { RegistroPage } from "../pages/registro/registro";
import { ElegirCartaPage } from '../pages/elegir-carta/elegir-carta';
import { PerfilPage } from '../pages/perfil/perfil';
import { ChatPage } from '../pages/chat/chat';
import { AvatarPage } from '../pages/avatar/avatar';
// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { SocialSharing } from '@ionic-native/social-sharing';

//Server modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

//Services
import { AuthService } from '../services/auth.service';
import { PartidaProvider } from '../providers/partida/partida';
import { PerfilProvider } from '../providers/perfil/perfil';
import { CardProvider } from '../providers/card/card';
import { TableProvider } from '../providers/partida/table';
export const firebaseConfig = {
  fire: {
    apiKey: "AIzaSyAzc86-ph5SfRHm22l0vNZDSUcixAk_ElM",
    authDomain: "loteria-88975.firebaseapp.com",
    databaseURL: "https://loteria-88975.firebaseio.com",
    projectId: "loteria-88975",
    storageBucket: "loteria-88975.appspot.com",
    messagingSenderId: "477126197467"
  }
}

@NgModule({
  declarations: [
    Loteria,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    JuegoPage,
    UnirsePage,
    ConfigPage,
    RecordPage,
    CrearPartidaPage,
    LoginPage,
    RegistroPage,
    ElegirCartaPage,
    PerfilPage,
    ChatPage,
    AvatarPage,
  ],
  imports: [
    FormsModule,
    BrowserModule, IonicModule.forRoot(Loteria),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxErrorsModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Loteria,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    JuegoPage,
    UnirsePage,
    ConfigPage,
    RecordPage,
    CrearPartidaPage,
    LoginPage,
    RegistroPage,
    ElegirCartaPage,
    PerfilPage,
    ChatPage,
    AvatarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    PartidaProvider,
    PerfilProvider,
    CardProvider,
    TableProvider,
    NativeAudio,
    SocialSharing,
    TextToSpeech,
  ]
})
export class AppModule {}
