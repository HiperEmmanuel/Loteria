import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CrearPartidaPage } from '../crear-partida/crear-partida';
import { UnirsePage } from "../unirse/unirse";
import { RecordPage } from "../record/record";
import { AboutPage } from "../about/about";
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { NativeAudio } from '@ionic-native/native-audio';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  Contador= 0;
  constructor(public navCtrl: NavController, private auth: AuthService, public socialSharing: SocialSharing, private nativeAudio: NativeAudio) {
    
  }

  ionViewWillEnter(){
    
    
  }

  ionViewWillLeave(){
    //this.nativeAudio.stop('rolilla');
  }
  easteregg(){
    this.Contador=this.Contador+1;
    
    if (this.Contador>5){
      this.navCtrl.push(AboutPage);
    }
  }
  crearPartida(): void {
    this.navCtrl.push(CrearPartidaPage);
  }
  unirsePartida(): void {
    this.navCtrl.push(UnirsePage);
  }
  records(): void {
    this.navCtrl.push(RecordPage);
  }
  Login(): void {
    this.navCtrl.push(LoginPage);
  }
  logout(): void {
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
  compartir() {
    // Share
    this.socialSharing.shareViaWhatsApp('Te invito a jugar lotería conmigo, solo tienes que bajarla: ', 'http://i68.tinypic.com/ngvi20.png', 'https://goo.gl/Vur4yw').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}


