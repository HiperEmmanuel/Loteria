import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TableProvider } from '../../providers/partida/table';
import { PartidaProvider } from '../../providers/partida/partida';
import * as firebase from 'firebase';
/**
 * import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
 *
*/


/**
 * Generated class for the ElegirCartaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elegir-carta',
  templateUrl: 'elegir-carta.html',
})
export class ElegirCartaPage {

  public tables: any;
  public user: any;
  public player: any;
  public room: any;
  public game: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private tableService: TableProvider, public partidaService: PartidaProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ElegirCartaPage');
    this.user= firebase.auth().currentUser;
    this.player=this.user.email;
    this.getTables();
  }

  getTables(){
    this.tableService.getTables().then(response =>{
      this.tables = response;
      this.partidaService.getlastroom(this.player).then(room =>{
        this.partidaService.getGame(room['id_game']).then(game =>{
          let currentGame: any = [];
          currentGame = game;
          let tables = currentGame.control.tables;
          let count = Object.keys(tables).length;
          for(var i = 0; i < count; i++){
            var key = tables[i].toString();
            if(key >= "-1"){
              delete this.tables[key];
            }
          }
        })
      }).catch(err =>{
        console.log(err);
      })
    }).catch(err =>{
      console.error(err);
    })
  }
  
  elegir(id$){
    this.view.dismiss(id$);
    this.partidaService.getlastroom(this.player).then(response =>{
      let player = response;
      this.partidaService.updateUserTable(player, id$);
      this.partidaService.updateGameTables(response, id$)
    }).catch(err =>{
      console.error(err);
    })
  }

}