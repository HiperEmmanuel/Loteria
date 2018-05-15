import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilProvider } from '../../providers/perfil/perfil';


/**
 * Generated class for the AvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})
export class AvatarPage {
  arr_images:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,private perfilProvider: PerfilProvider,
    public afDB: AngularFireDatabase) {
  }
  seleccionar(id){
    
    let Avatar = id;
    this.view.dismiss(Avatar);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarPage');
    this.getImages();
  }
  getImages(){
    this.perfilProvider.getImgs().then(value=>{
      console.log(value[1].id);
      this.arr_images=value;
    });
  }
  

}
