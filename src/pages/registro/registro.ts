import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import {PerfilProvider} from '../../providers/perfil/perfil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilPage } from '../perfil/perfil';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  signupError: string;
  form: FormGroup;
  Perfil={Correo: '',Nombre:'',Apodo:'',FechaNacimiento:'',Ciudad:''}

  constructor(private perfilService:PerfilProvider,fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private auth: AuthService) {
    this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  signup() {
    this.perfilService.crearPerfil(this.Perfil);
		let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(PerfilPage),
			error => this.signupError = error.message
		);
}

}
