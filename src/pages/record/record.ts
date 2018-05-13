import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController, AlertController, Alert } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { PartidaProvider } from "../../providers/partida/partida";
/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {
  showCard: any;
  showClientControl: any;
  partidas: boolean = false;
  cartas: boolean = true;
  owner: any;
  game_id: any;
  players: any;
  email: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private menu: MenuController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private afd: AngularFireDatabase,
    private pp: PartidaProvider) {
    
  }

  ionViewWillEnter(){
    this.menu.enable(true,'menurecords');
  }

  ionViewWillLeave(){
    this.menu.enable(false,'menurecords');
  }

 
}
