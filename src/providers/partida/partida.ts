import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { getLocaleNumberSymbol } from '@angular/common';
/*
  Generated class for the PartidaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartidaProvider {
  result :any;
  listGame?: any;
  correo ='hola';
  private db = firebase.database();
  data: any;
  id: any;
  public game:any;
  constructor(public afd: AngularFireDatabase) { }

  get_room_by_id(player){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('/room/').orderByKey().equalTo(player).on('value', (snap) => {
        try {
          let game = snap.val();
          if (game){
            let ids = Object.keys(game);
          let count = Object.keys(game).length;
          let m:any;
          for(var i=0; i< count; i++){
            var key = ids[i];
            var item = snap.child(key).val();
            item.id = key;
             resolve(item);
          }
          }
        }catch(err){
          reject(err);
        }

      });
    })
    return promise
  }
  crearPartida(name){
    this.afd.list('/game/').push(name);
  }
  updateGame(game){
    this.afd.list('/game/').update(game['id'], game);
  }
  crear_request_check(obj){
    this.afd.list('/request_check_room/').push(obj);
  }
  crear_request_full(obj){
    this.afd.list('/request_full_room/').push(obj);
  }
  crear_request_blast(obj){
    this.afd.list('/request_blast_room/').push(obj);
  }
  crear_request_square(obj){
    this.afd.list('/request_square_room/').push(obj);
  }
  crear_request_center(obj){
    this.afd.list('/request_center_room/').push(obj);
  }

  get_request_check(obj){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/request_check_room/').orderByChild('game_id').equalTo(obj).on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          if (games){
            let ids = Object.keys(games);
          let count = Object.keys(games).length;

          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == true){
                game = {
                game_id:item.game_id,
                player_room: item.player_room,
                stats: item.stats,
                status: item.status
              }
              lsGames.push(game);
            }
          }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }
  get_request_full(obj){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/request_full_room/').orderByChild('game_id').equalTo(obj).limitToFirst(1).on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          if (games){
            let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == true){
                game = {
                game_id:item.game_id,
                player_room: item.player_room,
                status: item.status
              }
              lsGames.push(game);
            }
          }

          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }
  get_request_blast(obj){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/request_blast_room/').orderByChild('game_id').equalTo(obj).limitToFirst(1).on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          if(games){
            let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            //console.log(item);
            lsGames.push(item);
          }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }
  get_request_square(obj){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/request_square_room/').orderByChild('game_id').equalTo(obj).limitToFirst(1).on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          if(games){
            let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == true){
                game = {
                game_id:item.game_id,
                player_room: item.player_room,
                status: item.status
              }
              lsGames.push(game);
            }
          }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }
  get_request_center(obj){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/request_center_room/').orderByChild('game_id').equalTo(obj).on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          if(games){
            let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == true){
                game = {
                game_id:item.game_id,
                player_room: item.player_room,
                status: item.status
              }
              lsGames.push(game);
            }
          }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }


  getlastgame(player){
    let promise = new Promise((resolve, reject)=>{
      let control = true;
      this.db.ref('/game/').orderByChild("owner").equalTo(player).limitToLast(1).on('value',(snap)=>{
        try{
          if(control == true){
          control = false;

          let lastGame = snap.val();

          let id = Object.keys(lastGame);
          //console.log("game");
          let game = snap.child(id[0]).val();
          //console.log("game");
          game.id = id[0];

          resolve(game);
          }
        }catch(err){ reject(err)}
      });
    })
    return promise;
  }

  getlastroom(player){
    let promise = new Promise((resolve, reject)=>{
      let control = true;

      this.db.ref('/room/').orderByChild("player").equalTo(player).limitToLast(1).on('value', (snap)=>{
        try{
          if(control == true){
          control = false;

          let lastRoom = snap.val();
          let id = Object.keys(lastRoom);
          let room = snap.child(id[0]).val();
          room.id = id[0];


          resolve(room);
          }
        }catch(err){ reject(err)}
      })
    })
    return promise
  }

  update_card(element, obj){
    this.afd.list('/game/').update(element, obj);
  }
  update_wins(id_game, game){
    this.afd.list('/game/').update(id_game, game);
  }
  update_stats(obj){
    this.afd.list('/room/').update(obj.id, obj);
  }

  /*get_my_game(player){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('/room/').orderByChild('player').equalTo(player).on('value', (snap) => {
        try {
          let game = snap.val();
          let ids = Object.keys(game);
          let count = Object.keys(game).length;
          let m:any;
          for(var i=0; i< count; i++){
            var key = ids[i];
            var item = snap.child(key).val();
            //console.log(item);
            if(item.status == 'A'){
              m = item.id_game;
             resolve(m);
            }
          }
        }catch(err){
          reject(err);
        }

      });
    })
    return promise
  }*/

  newRoom(player, game){
    player.id_game = game.id;
    player['last'] = 1;
    this.db.ref('/room/').push(player);
  }


  leaveGame(user){
    let gamecontrol = true;
    let roomcontrol = true;
    let leaveControl = true;
    this.db.ref('/game/').orderByChild("owner").equalTo(user.email).limitToLast(1).on('value',(snap)=>{
      try{
        if(gamecontrol == true){
        gamecontrol = false;

        let lastGame = snap.val();
        let id = Object.keys(lastGame);
        let game = snap.child(id[0]).val();
        game.id = id[0];
        //console.log(game);
        if(game.owner == user.email){
          /*let currentUsers = game.control.players
          let updatenumUsers = currentUsers - 1;
          game.control.palyers = updatenumUsers;*/
          game.status = "L"
          this.afd.list('/game/').update(id[0], game);
          }
        }
      }catch(err){
        console.log(err);
      }
    });
    this.db.ref('/room/').orderByChild("player").equalTo(user.email).limitToLast(1).on('value', (snap)=>{
      try{
        if(roomcontrol == true){
        roomcontrol = false;

        let lastRoom = snap.val();
        let id = Object.keys(lastRoom);
        let room = snap.child(id[0]).val();
        //room.id = id[0];
        //console.log(room);
        room.status = "L";
        this.afd.list('/room/').update(id[0], room);
          this.db.ref('/game/').orderByKey().equalTo(room.id_game).on('value', result => {
            try{
              if(leaveControl == true){
                leaveControl = false;
              let item = result.val();
              let id = Object.keys(item);
              let game = result.child(id[0]).val();
              game.id = id[0];
              let currentUsers = game.control.players
              let updatenumUsers = currentUsers - 1;
              if(currentUsers > 1){
                game.control.players = updatenumUsers;
                this.afd.list('/game/').update(id[0], game);
              }
              }
            }catch(err){
              console.log(err);
            }
          });
        }
      }catch(err){
        console.log(err);
      }
    })

  }

  joinGame(player){
    let promise = new Promise((resolve, reject)=>{
    let z=true;
    let gg = true;
    try{
    firebase.database().ref('/room/').orderByChild('id_game').equalTo(player.id_game).on('value', (snapshot) => {
      this.db.ref('/game/').orderByKey().equalTo(player.id_game).on('value', result =>{
        let item = result.val();
        let id = Object.keys(item);
        let game = result.child(id[0]).val();
        if (gg) {
          gg=false;
          game.control.players = game.control.players + 1;
            if (game.control.players >= game.settings.players){
              game.status = "f";
            }
            this.afd.list('/game/').update(id[0], game);
        }
          if(z==true){
              z = false;
              player['last'] = 1;
              this.afd.list('/room/').push(player);
              resolve(player);
          }
      });
    });
    }catch(err){reject(err)}
    })
  return promise
  }

  getPlayers(id_game){
    let promise = new Promise((resolve, reject) => {
      let controlplayers = true;
      this.db.ref('/room/').orderByChild('id_game').equalTo(id_game).on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          if(controlplayers == true){
            controlplayers = false;
          let games = snapshot.val();
          let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();

            if(item.status == 'A'){
                game = {
                id: key,
                id_game: id_game,
                player: item.player,
                stats: item.stats,
                table: item.table,
                status: item.status,
                timestamp: item.timestamp
              }
              lsGames.push(game);
            }
          }
          resolve(lsGames);
        }
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }

  getCarta(id_game){
    let promise = new Promise((resolve, reject) =>{
      let controlgame = true;
      if(controlgame = true){
      this.db.ref('/card/').orderByChild('id').equalTo(id_game).on('value', result => {
        try{
          if(controlgame = true){
            controlgame = false;
          let item = result.val();
          let id = Object.keys(item);
          let gg = result.child(id[0]).val();
          gg.id = id[0];
          resolve(gg)
          }
        }catch(err){
          reject(err);
        }
      });
    }
    })
    return promise;
  }

  getGame(id_game){
    let promise = new Promise((resolve, reject) =>{
      let controlgame = true;
      if(controlgame = true){
      this.db.ref('/game/').orderByKey().equalTo(id_game).on('value', result => {
        try{
          if(controlgame = true){
            controlgame = false;
          let item = result.val();
          let id = Object.keys(item);
          let game = result.child(id[0]).val();
          game.id = id[0];
          resolve(game)
          }
        }catch(err){
          reject(err);
        }
      });
    }
    })
    return promise;
  }

  updateGameTables(game, id_table){
    let currentGame: any = [];
    currentGame = game;
    let control = true;
    firebase.database().ref('/game/').orderByKey().equalTo(currentGame.id_game).on('value', (snap) => {
      try {
      if(control == true){
        control = false;
        let updateGame = snap.child(currentGame.id_game).val();
        updateGame.control.tables.push(id_table);
        this.afd.list('/game/').update(currentGame.id_game, updateGame);
      }
      }catch(err){
        console.log(err);
      }
    });
  }

  getPublicGames(){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/game/').orderByChild('type').equalTo('public').on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          //console.log(games);
          let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == 'w'){
                game = {
                id_game: key,
                owner: item.owner,
                random: item.random,
                settings: item.settings,
                control: item.control,
                status: item.status,
                timestamp: item.timestamp,
                title: item.title,
                type: item.type
              }
              lsGames.push(game);
            }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }

  getGamesWhereWin(user){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/game/').on('value',(snapshot)=> {
        let lsGames = {full:0,blast:0,quarter:0, center:0, total:0};
        try{
          let games = snapshot.val();
          //console.log(games);
          let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if (item['control']) {
              if(item.control.wins.full == user){
                lsGames.full++;
              }if(item.control.wins.blast == user){
                lsGames.blast++;
              }if(item.control.wins.quarter == user){
                lsGames.quarter++;
              }if(item.control.wins.center == user){
                lsGames.center++;
              }
              lsGames.total++;
            }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }

  getRooms(player){
    let promise = new Promise((resolve, reject) =>{
      firebase.database().ref('/room/').orderByChild('id_game').equalTo(player.id_game).on('value', (snapshot) => {
        let z;
        let lsRooms = [];
        try{
          let rooms = snapshot.val();
          //console.log(games);
          let ids = Object.keys(rooms);
          let count = Object.keys(rooms).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == 'A'){
            lsRooms.push(item);
            }
          }
          resolve(lsRooms);
        }catch(err){
          reject(err);
        }
      });
    })
    return promise;
  }

  get_my_room(player){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('/room/').orderByChild('player').equalTo(player).limitToLast(1).on('value', (snap) => {
        try {
          let game = snap.val();
          let ids = Object.keys(game);
          let count = Object.keys(game).length;
          let m:any;
          for(var i=0; i< count; i++){
            var key = ids[i];
            var item = snap.child(key).val();
            //A diferencia de get_my_game aquí se retorna el objeto completo
            if(item.status == 'A'){
              item.id = key;
              resolve(item);
            }
          }
        }catch(err){
          reject(err);
        }

      });
    })
    return promise
  }

  updateUserTable(player, id_table){
      let control = true;
      firebase.database().ref('/room/').orderByKey().equalTo(player.id).on('value', (snap) => {
        try {
        if(control == true){
          control = false;
          let room = snap.val();
          let ids = Object.keys(room);
          var key = ids[0];
          var updateUser = snap.child(key).val();
          //Se actualiza el item tabla del objeto room_player
          updateUser.table = id_table

          this.afd.list('/room/').update(key, updateUser);
        }
        }catch(err){
          console.log(err);
        }
    });
  }

  update_my_room(room){
    let z=true;
    this.db.ref('/room/').orderByChild('player').equalTo(room.player).on('value', (snapshot) => {
      try{
        let game = snapshot.val();
        let ids = Object.keys(game);
        let count = Object.keys(game).length;
        let m:any;
        for(var i=0; i< count; i++){
          var key = ids[i];
          var item = snapshot.child(key).val();
          //A diferencia de get_my_game aquí se retorna el objeto completo
          if(item.status == 'A'){
            if(z == true){
              z=false;
            this.afd.list('/room/').update(key, room);
            }
          }
        }
      }catch(e){console.log(e)}

    });
  }

}





