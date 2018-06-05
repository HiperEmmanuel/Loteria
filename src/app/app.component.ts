import { Component } from '@angular/core';
import { Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../services/auth.service';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  templateUrl: 'app.html'
})
export class Loteria {
  rootPage:any = TabsPage;
  onSuccessPlaying:any;onError:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService, private nativeAudio: NativeAudio,public events: Events, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.nativeAudio.preloadComplex('rolilla', 'assets/sounds/ambiente.mp3',0.4,1,0).then(this.onSuccessPreloading, this.onError);
    });
  }
  onSuccessPreloading = (data) => {
    console.log('success preloading', data);
    this.nativeAudio.play('rolilla').then(this.onSuccessPlaying, this.onError);
    this.nativeAudio.loop('rolilla');
  }

  openRecord(record: string){
     var records = { partidas: false,
      mejorestablas: false,
      ganadores: false,
      chorros: false,
      cuatroesquinas: false,
      centritos: false,
      perdedores: false}

    switch (record) {
      case "partidas":
        records.partidas = true;
        break;
      
      case "mejorestablas":
        records.mejorestablas = true;
        break;

      case "ganadores":
        records.ganadores = true;
        break;

      case "chorros":
        records.chorros = true;
        break;

      case "cuatroesquinas":
        records.cuatroesquinas = true;
        break;

      case "centritos":
        records.centritos = true;
        break;

      case "perdedores":
        records.perdedores = true;
        break;
    }
    this.events.publish('openRecord',records);
    this.menu.close();
  }

}
