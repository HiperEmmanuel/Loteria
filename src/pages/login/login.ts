import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, fb: FormBuilder, private modal: ModalController) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.parent.select(0),
        error => this.loginError = error.message
      );
  }

  loginWithGoogle(){
    this.auth.signInWithGoogle().then(() => this.navCtrl.setRoot(TabsPage),
    error => console.log(error.message)
  );
  }

  signup(){
    const myModal = this.modal.create(RegistroPage);
    myModal.onDidDismiss(()=> this.navCtrl.setRoot(PerfilPage) );
    myModal.present();
  }
}
