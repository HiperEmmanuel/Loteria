import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JuegoPage } from "../juego/juego";
import { PartidaProvider } from '../../providers/partida/partida';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { ElegirCartaPage } from '../elegir-carta/elegir-carta';
import * as firebase from 'firebase';

/**
 * Generated class for the CrearPartidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-crear-partida",
  templateUrl: "crear-partida.html"
})
export class CrearPartidaPage {
  auth:any;
  user:any;
  perfil: any;
  i:any;
  email:any;
  public player: any;
  newGame = {title: '', description: null, timestamp: 0, owner: '', type: '', status:'', settings: {},random:{}, currentCard: 0, control:{players: 1,wins:{full:'', blast:'', center: '',quarter:''}, tables:{0:-1}, values: {} }};
  settings = {players:0,pricecard: 0, cardtimer:0, full:false, blast:false, quarters:false, middle:false};
  values= {fullvalue:0,blastvalue:0,quartervalue:0,middlevalue:0};

  constructor(public navCtrl: NavController, public navParams: NavParams,public pp:PartidaProvider, private modal: ModalController, public perfilService: PerfilProvider) {
    this.i=true;
    this.user= firebase.auth().currentUser;
    this.email=this.user.email;
    //console.log(this.email);
    /*if(this.i==true){
    this.i=false;
    */
    this.perfilService.getPerfil((this.user.email),(result) => {
      if(result!=null)this.perfil =result;
      //console.log(this.perfil.Apodo);
      this.title = this.perfil.Apodo;
    });
    this.updatePriceValues();
  }
  title:any= "";
  description:any = null;
  timestamp:any;
  pricecard: any = 2;
  players: any = 5;
  cardtimer:any="3";
  full:any=true;
  fullvalue : any = 0;
  blast:any=false;
  blastvalue : any = 0;
  quarters:any=false;
  quartersvalue: any = 0;
  middle:any=false;
  middlevalue: any = 0;
  status:any;
  type:any = 'public';
  porcfull = 100;
  porcblast = 0;
  porcquarters = 0;
  porcmiddle = 0;

  ok:any;

  setData(){
    this.status = 'w';
    this.newGame.title = this.title
    this.newGame.description = null;
    this.newGame.timestamp = this.timestamp;
    this.newGame.owner = this.email;
    this.newGame.type = this.type;
    this.newGame.status = this.status;
    this.settings.players = this.players;
    this.settings.pricecard = this.pricecard;
    this.settings.cardtimer = this.cardtimer;
    this.settings.full = this.full;
    this.settings.blast = this.blast;
    this.settings.quarters = this.quarters;
    this.settings.middle = this.middle;
    this.values.fullvalue = this.fullvalue;
    this.values.blastvalue = this.blastvalue;
    this.values.quartervalue = this.quartersvalue;
    this.values.middlevalue = this.middlevalue;

    //Define la cantidad de numeros aleatorios.
    var numCards = 54;

    var myArray = []
    while(myArray.length < numCards ){
      var numeroAleatorio = Math.ceil(Math.random() * numCards);
      var existe = false;
      for(var i=0;i<myArray.length;i++){
      if(myArray [i] == numeroAleatorio){
            existe = true;
            break;
        }
      }
      if(!existe){
        myArray[myArray.length] = numeroAleatorio;
      }
    }
    this.newGame.random = myArray;
    this.newGame.settings = this.settings;
    this.newGame.control.values = this.values;

  }
  entrarJuego(): void {
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.setData();

    this.addItem();
    const modalElegirCarta = this.modal.create(ElegirCartaPage);
    modalElegirCarta.onDidDismiss(data => {
      this.pp.getlastgame(this.player.player).then(obb => {
        let currentGame: any = [];
        currentGame = obb;
        this.ok = currentGame.id;
        this.navCtrl.push(JuegoPage,{tabla:data, game: this.ok});
      });
    });
    modalElegirCarta.present();
  }
  addItem() {
    //console.log("hola");
    this.pp.crearPartida(this.newGame);
    this.player = {
      player: this.email,
      status: 'A',
      stats: [
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}],
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}],
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}],
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}]
        ],
      table: 0,
      timestamp: this.timestamp
    }
    this.pp.getlastgame(this.player.player).then(response =>{
      response;
      this.pp.newRoom(this.player, response);
    }).catch(err =>{
      console.error(err);
    })

  }

  ionViewDidLoad() {
  }

  updatePriceValues(){

    this.fullvalue = Math.round(this.pricecard * this.players  * (this.porcfull* 0.01));
    this.blastvalue = Math.round(this.pricecard * this.players  * (this.porcblast* 0.01));
    this.quartersvalue = Math.round(this.pricecard * this.players  * (this.porcquarters* 0.01));
    this.middlevalue = Math.round(this.pricecard * this.players  * (this.porcmiddle* 0.01));

  }

  updatePorc(juego){
    if (juego=="blast"){
      if (this.blast){
        this.porcblast = 20;
        this.porcfull -= 20;
      }else{
        this.porcblast = 0;
        this.porcfull += 20;
      }
    }else if (juego=="quarters"){
      if (this.quarters){
        this.porcquarters = 20;
        this.porcfull -= 20;
      }else{
        this.porcquarters = 0;
        this.porcfull += 20;
      }
    }else if (juego=="middle"){
      if (this.middle){
        this.porcmiddle = 10;
        this.porcfull -= 10;
      }else{
        this.porcmiddle = 0;
        this.porcfull += 10;
      }
    }

    this.updatePriceValues();
  }

}
