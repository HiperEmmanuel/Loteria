import { Component, style, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { PartidaProvider } from '../../providers/partida/partida';
import { TableProvider } from '../../providers/partida/table';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { HomePage } from "../home/home";
import { CrearPartidaPage } from "../crear-partida/crear-partida";
import 'rxjs/add/observable/interval';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { PerfilProvider } from '../../providers/perfil/perfil';

import { AnimationService, AnimationBuilder } from 'css-animator';

/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class JuegoPage {

  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;

  //texto: string =  "SI";
  estadoPositivo = [];
  putos=1;
  index=0;
  tb:any;
  public id: any;
  public tables: any;
  public table: any;
  user:any;
  sub:any;
  game:any;
  game_id:any;
  settings: any = {players:0,pricecard: 0, cardtimer:0, full:false, blast:false, quarters:false, middle:false};
  indice = 0;
  indice2 = 0;
  s_full=false;
  s_center = false;
  s_square = false;
  s_blast = false;
  intervalito = 1;
  subControl: any = false;
  owner: any;
  email: any;
  currentCard: any;
  players:any;
  public games: any;
  public waitGame: any;
  public showControl: any;
  public room_request_check:any = {player_room: null, game_id: null, stats:[null,null,null], status: true};
  public room_request_full:any = {player_room: null, game_id: null, status: true};
  public room_request_blast:any = {player_room: null, game_id: null, status: true};
  public room_request_square:any = {player_room: null, game_id: null, status: true};
  public room_request_center:any = {player_room: null, game_id: null, status: true};
  public showClientControl: any = false;
  public showStats: any;
  public showStatscontrol: any;
  public gettingrooms: any;
  public initCard: any = true;
  public putoelkelolea:any = true;
  public perfil = [];
  public quarterWinner: any;
  public centerWinner: any;
  public blastWinner: any;
  public fullWinner: any;
  public cartas:any;
  public guestGame: any;

  constructor(private tts: TextToSpeech,private alertCtrl: AlertController, public navCtrl: NavController,public partidaService: PartidaProvider, public navParams: NavParams, private modal: ModalController, private tableService: TableProvider, public afDB: AngularFireDatabase,private animationService: AnimationService,private perfilService: PerfilProvider) {
    this.animator = animationService.builder();
    this.partidaService.getCarta().then(zz=>{
      this.cartas=zz;       
    });
    this.game = {random: [0,0,0]}
    this.estadoPositivo[0] = false;
    this.estadoPositivo[1] = false;
    this.estadoPositivo[2] = false;
    this.estadoPositivo[3] = false;
    this.estadoPositivo[4] = false;
    this.estadoPositivo[5] = false;
    this.estadoPositivo[6] = false;
    this.estadoPositivo[7] = false;
    this.estadoPositivo[8] = false;
    this.estadoPositivo[9] = false;
    this.estadoPositivo[10] = false;
    this.estadoPositivo[11] = false;
    this.estadoPositivo[12] = false;
    this.estadoPositivo[13] = false;
    this.estadoPositivo[14] = false;
    this.estadoPositivo[15] = false;
    this.game_id = this.navParams.get('game');
    this.partidaService.getGame(this.game_id).then(response => {
      let currentGame: any = [];
      currentGame = response;
      this.game = currentGame;
      this.settings = currentGame.settings;
      console.log(this.game);
    })
    
  }
  
  animateElem() {
    this.animator.setType('flipInX').show(this.myElem.nativeElement);
  }
  ionViewWillLeave(){
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'flex';
    }
    this.partidaService.leaveGame(this.user);
  }

  ionViewDidLoad() {
    this.user= firebase.auth().currentUser;
    this.email = this.user.email;

    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
    this.play();
    this.partidaService.getGame(this.game_id).then( aa => {
      this.game = aa;

      this.intervalito = Number(this.game.settings.cardtimer);
    });
  }

  card(id){
    this.estadoPositivo[id] = !this.estadoPositivo[id];
    let valor = this.estadoPositivo[id];
    let index = 0;
    if(id < 4){

    }
    else if (id < 8) {
      index = 1;
      id = id - 4;
    }else if(id < 12){
      index = 2;
      id = id - 8;
    }else if(id <16){
      index = 3;
      id = id - 12;
    }

        let room;
         this.partidaService.get_my_room(this.user.email).then(xa => {
           room = xa;
           room.stats[index][id].marked = valor;

           let req = this.room_request_check;
           req.player_room = room.id;
           req.game_id = this.game_id;
           req.stats[0] = index;
           req.stats[1] = id;
          req.stats[2] = valor;

           this.partidaService.crear_request_check(req);

           //this.partidaService.update_stats(room);
          });

    //elementStyle(".si");
  }
  ionViewWillEnter(){
    this.game_id = this.navParams.get('game');
    this.partidaService.getGame(this.game_id).then( ab => {
      let currentGame: any = [];
      currentGame = ab;
      this.owner = currentGame.owner;
      this.gettingrooms = this.afDB.list('/room/').valueChanges().subscribe(players => {
        this.partidaService.getPlayers(this.game_id).then(
          response => {
            this.players = response;
            this.perfil = [];
            for(let player of this.players){
              let data = { player: '', avatar: '' };
              this.perfilService.getPerfil((player.player),(result) => {
                var avatar = result.Avatar;
                var apodo = result.Apodo;
                data.avatar = avatar;
                data.player= apodo;
              });
              this.perfil.push(data);
            }
          }
        )
      });

      if(this.email != this.owner){
        let z=false;
        this.showClientControl = true;
        this.waitGame = this.afDB.list('/game/'+this.game_id).valueChanges().subscribe(game => {
            if(game['6'] == "I"){
              if(z==false){
                this.iniciar();
                z=true;
              }
            }
      });
      }

    });
  }



  play(){
    this.tb=this.navParams.get('tabla');
    this.game_id = this.navParams.get('game');
    this.tableService.getTables().then(response =>{
      this.tables = response;
      this.table = this.tables[this.tb]
    }).catch(err =>{
      console.error(err);
    })
  }

  abrirChat(){
    const modalChat = this.modal.create(ChatPage);
    modalChat.present();
  }
  ngOnDestroy(): void {
    this.partidaService.leaveGame(this.user);
  }

  stopObs(): void {
    if(this.subControl == true){
      this.sub.unsubscribe();
      this.gettingrooms.unsubscribe();
    }
  }

  salir(){
    this.stopObs();
    this.partidaService.leaveGame(this.user);
    this.navCtrl.setRoot(HomePage);
  }
  /////////////////////////////////////////juego.html
  modal2(win){
    this.partidaService.getlastgame(this.owner).then( ab => {
      this.owner = ab;
    });

    let alert = this.alertCtrl.create({
      title: 'PARTIDA FINALIZADA',
      message: '<p><strong>El juego a terminado:</strong></p> <p*ngIf="settings.blast">Chorro:'+ (this.blastWinner.player)+'</p>' +'<p*ngIf="settings.quarters">Cuatro Esquinas:'+ (this.quarterWinner.player)+'</p>'+'<p*ngIf="settings.middle">Centrito:'+ (this.centerWinner.player)+'</p>' +'<p>Llenas:'+ (win) +'</p>' ,
      buttons: [
        {
          text: 'Salir Sala',
          role: 'cancel',
          handler: () => {
            this.navCtrl.push(HomePage);
            this.salir();
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Volver a Jugar',
          handler: () => {
            this.navCtrl.push(CrearPartidaPage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  ///////////////////////////////////////////////juego.html
  initServer(){
    this.partidaService.getGame(this.game_id).then( ab => {
      this.game = ab;
      this.game.status="I";
      this.partidaService.updateGame(this.game);
      setTimeout(this.iniciar(), 2000);
    });
  }

  iniciar(){
    this.tts.speak(
      {text:'Se va y se corre',
      locale:'es-MX'
    }).then(() => console.log('Se va y se corre')).catch((reason: any) => console.log(reason));
  
    this.index=0;
    this.putos=this.game.random[this.index];    
    this.initCard = false;
    this.subControl = true;
    let eraunamamada = true;
    this.sub = Observable.interval(1000*this.intervalito).subscribe((val) => {
      this.putos=this.game.random[this.index];      
      if(this.index < 54){
      this.tts.speak(
       {text:this.cartas[this.putos].name,
       locale:'es-MX'
      });
      this.index ++;  
    }
    console.log(this.index);
   
      this.partidaService.getGame(this.game_id).then( aa => {
        if (eraunamamada){
          eraunamamada = false;
          this.game = aa;
        }
        if (this.user.email == this.game.owner) {
          /*if (this.putoelkelolea){
            this.putoelkelolea = false;
            this.partidaService.update_card(this.game_id, this.game);
          }*/
        //funciona esto ya

        this.partidaService.get_request_check(this.game_id).then(gg => {
            let f:any = gg;
            f.forEach(element => {
              try {
              this.partidaService.get_room_by_id(element.player_room).then(xa => {
                let room:any = xa;
                room.stats[element.stats[0]][element.stats[1]].marked = true;
                this.partidaService.update_stats(room);
               });
              } catch (error) {

              }
            });
        });

        /////////////////////////////////////////////7
        if (this.game.control.wins.full == ''){
          console.log('esperando full');
          this.partidaService.get_request_full(this.game_id).then( gg => {
            let gf:any = gg;
            if (gf.length>0){
              gf = gf[0];
              this.partidaService.get_room_by_id(gf.player_room).then(
                ff => {
                  let ag:any = ff;
                  this.game.control.wins.full = ag.player;
                  this.partidaService.update_card(this.game_id, this.game);
                }
              )
            }
          })
        }else{
          this.fullWinner = this.game.control.wins.full;
          this.perfilService.getPerfil((this.fullWinner),(result) => {
            var avatar = result.Avatar;
            var apodo = result.Apodo;
            var data = {player: '', avatar: ''};
            data.avatar = avatar;
            data.player= apodo;
            this.fullWinner=data;
            this.game.status = "F";
            this.partidaService.update_card(this.game_id, this.game);
            console.log('partida terminada');
            this.modal2(this.fullWinner.player);
            this.stopObs();
          });

        }
        
        if (this.game.control.wins.blast == ''){
          this.partidaService.get_request_blast(this.game_id).then( gg => {
            let gf:any = gg;
            if (gf.length>0){
              gf = gf[0];
              this.partidaService.get_room_by_id(gf.player_room).then(
                ff => {
                  let ag:any = ff;
                this.game.control.wins.blast = ag.player;
                this.partidaService.update_card(this.game_id, this.game);
              }
            )}
          })
        }else{
          this.blastWinner = this.game.control.wins.blast;
          this.perfilService.getPerfil((this.blastWinner),(result) => {
            var avatar = result.Avatar;
            var apodo = result.Apodo;
            var data = {player: '', avatar: ''};
            data.avatar = avatar;
            data.player= apodo;
            this.blastWinner=data;
          });
        }
        if (this.game.control.wins.quarter == ''){
          this.partidaService.get_request_square(this.game_id).then( gg => {
            let gf:any = gg;
            if (gf.length>0){
              gf = gf[0];
              this.partidaService.get_room_by_id(gf.player_room).then(
                ff => {
                  let ag:any = ff;
                this.game.control.wins.quarter = ag.player;
                this.partidaService.update_card(this.game_id, this.game);
              }
            )}
          })
        }else{
          this.quarterWinner = this.game.control.wins.quarter;
          this.perfilService.getPerfil((this.quarterWinner),(result) => {
            var avatar = result.Avatar;
            var apodo = result.Apodo;
            var data = {player: '', avatar: ''};
            data.avatar = avatar;
            data.player= apodo;
            this.quarterWinner=data;
          });
        }
        if (this.game.control.wins.center == ''){
          this.partidaService.get_request_center(this.game_id).then( gg => {
            let gf:any = gg;
            if (gf.length>0){
              gf = gf[0];
              this.partidaService.get_room_by_id(gf.player_room).then(
                ff => {
                  let ag:any = ff;
                this.game.control.wins.center = ag.player;
                this.partidaService.update_card(this.game_id, this.game);
              }
            )}
          })
        }else{
          this.centerWinner = this.game.control.wins.center;
          this.perfilService.getPerfil((this.centerWinner),(result) => {
            var avatar = result.Avatar;
            var apodo = result.Apodo;
            var data = {player: '', avatar: ''};
            data.avatar = avatar;
            data.player= apodo;
            this.centerWinner=data;
          });
        }
        this.partidaService.getPlayers(this.game_id).then(hh => {
          let as:any = hh;
          //console.log(as);
          as.forEach(element => {
            this.tableService.getTables().then(response =>{
              this.search_card(this.game.random[this.index], this.tables[this.tb], element.player);
            }).catch(err =>{
              console.error(err);
            })

          });
        })
        ///////////////////////////////////////////////
        }else if(this.user.email != this.game.owner){
          this.waitGame.unsubscribe();
          this.game = aa;
   
          if(this.game.control.wins.blast != '' && !this.blastWinner){
            this.blastWinner = this.game.control.wins.blast;
            this.perfilService.getPerfil((this.blastWinner),(result) => {
              var avatar = result.Avatar;
              var apodo = result.Apodo;
              var data = {player: '', avatar: ''};
              data.avatar = avatar;
              data.player= apodo;
              this.blastWinner=data;
            });
          }

          if(this.game.control.wins.center != '' && !this.centerWinner){
            this.centerWinner = this.game.control.wins.center
            this.perfilService.getPerfil((this.centerWinner),(result) => {
              var avatar = result.Avatar;
              var apodo = result.Apodo;
              var data = {player: '', avatar: ''};
              data.avatar = avatar;
              data.player= apodo;
              this.centerWinner=data;
            });
          }
        
          if(this.game.control.wins.quarter != '' && !this.quarterWinner){
            this.quarterWinner = this.game.control.wins.quarter
            this.perfilService.getPerfil((this.quarterWinner),(result) => {
              var avatar = result.Avatar;
              var apodo = result.Apodo;
              var data = {player: '', avatar: ''};
              data.avatar = avatar;
              data.player= apodo;
              this.quarterWinner=data;
            });
          }

          if(this.game.control.wins.full != ''){
            this.fullWinner = this.game.control.wins.full;
            this.perfilService.getPerfil((this.fullWinner),(result) => {
              var avatar = result.Avatar;
              var apodo = result.Apodo;
              var data = {player: '', avatar: ''};
              data.avatar = avatar;
              data.player= apodo;
              this.fullWinner=data;
              if(this.game.status == "F"){
                this.modal2(this.fullWinner.player);
                this.stopObs();
              }
            });
          }
        }

        this.partidaService.get_my_room(this.user.email).then(xa => {
          let roomy:any = xa;
          if (this.s_full){
          this.is_full(roomy);
        }
          if (this.s_blast)
          this.is_blast(roomy)
          if (this.s_square)
          this.is_kuatro(roomy)
          if (this.s_center)
          this.is_center(roomy)
         });
      }).catch(err =>{
        console.log(err);
      });
    });
  }

is_full(room){
  let a = room.stats;
  if (a[0][0].marked == true && a[0][0].showed == true && a[0][1].marked == true && a[0][1].showed == true && a[0][2].marked == true && a[0][2].showed == true && a[0][3].marked == true && a[0][3].showed == true && a[1][0].marked == true && a[1][0].showed == true && a[1][1].marked == true && a[1][1].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[1][3].marked == true && a[1][3].showed == true && a[2][0].marked == true && a[2][0].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[2][2].marked == true && a[2][2].showed == true && a[2][3].marked == true && a[2][3].showed == true && a[3][0].marked == true && a[3][0].showed == true && a[3][1].marked == true && a[3][1].showed == true && a[3][2].marked == true && a[3][2].showed == true && a[3][3].marked == true && a[3][3].showed == true){
    let req = this.room_request_full;
    req.game_id = this.game_id;
    req.player_room = room.id;
    this.partidaService.crear_request_full(req);
  }
  this.s_full = false;
}
is_blast(room){
  let a = room.stats;
  if ((a[0][0].marked == true && a[0][0].showed == true && a[1][1].marked == true && a[1][1].showed == true && a[2][2].marked == true && a[2][2].showed == true && a[3][3].marked == true && a[3][3].showed == true) || (a[0][3].marked == true && a[0][3].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[2][0].marked == true && a[2][0].showed == true) || 
    (a[0][0].marked == true && a[0][0].showed == true && a[0][1].marked == true && a[0][1].showed == true && a[0][2].marked == true && a[0][2].showed == true && a[0][3].marked == true && a[0][3].showed == true) || (a[1][0].marked == true && a[1][0].showed == true && a[1][1].marked == true && a[1][1].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[1][3].marked == true && a[1][3].showed == true) || (a[2][0].marked == true && a[2][0].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[2][2].marked == true && a[2][2].showed == true && a[2][3].marked == true && a[2][3].showed == true) || (a[3][0].marked == true && a[3][0].showed == true && a[3][1].marked == true && a[3][1].showed == true && a[3][2].marked == true && a[3][2].showed == true && a[3][3].marked == true && a[3][3].showed == true)||
    (a[0][0].marked == true && a[0][0].showed == true && a[1][0].marked == true && a[1][0].showed == true && a[2][0].marked == true && a[2][0].showed == true && a[3][0].marked == true && a[3][0].showed == true) || (a[0][1].marked == true && a[0][1].showed == true && a[1][1].marked == true && a[1][1].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[3][1].marked == true && a[3][1].showed == true) || (a[0][2].marked == true && a[0][2].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[2][2].marked == true && a[2][2].showed == true && a[3][2].marked == true && a[3][2].showed == true) || (a[0][3].marked == true && a[0][3].showed == true && a[1][3].marked == true && a[1][3].showed == true && a[2][3].marked == true && a[2][3].showed == true && a[3][3].marked == true && a[3][3].showed == true)){
    let req = this.room_request_blast;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_blast(req);
    this.s_blast = false;
  }
}
is_center(room){
  let a = room.stats;
  if(a[1][1].marked == true && a[1][1].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[2][2].marked == true && a[2][2].showed == true){
    let req = this.room_request_center;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_center(req);
    this.s_center = false;
  }
}
is_kuatro(room){
  let a = room.stats;
  if(a[0][0].marked == true && a[0][0].showed == true && a[0][3].marked == true && a[0][3].showed == true && a[3][0].marked == true && a[3][0].showed == true && a[3][3].marked == true && a[3][3].showed == true){
    let req = this.room_request_square;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_square(req);
    this.s_square = false;
  }
}

  search_card(carta, table, user){
    for (let index = 0; index < table.length; index++) {
      for (let i = 0; i < table[index].length; i++) {
        if (table[index][i] == carta) {
         let room;
         this.partidaService.get_my_room(user).then(xa => {
           room = xa;
           room.stats[index][i].showed = true;
           this.partidaService.update_stats(room);
          });
          break;
        }
      }
    }
  }

}
