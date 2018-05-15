import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {
  private db = firebase.database();
  constructor(public afd: AngularFireDatabase) {
    console.log('Hello PerfilProvider Provider');
  }

  crearPerfil(perfil) {
    //console.log('entre');
    let z=true;
   firebase.database().ref('/Perfiles/').orderByChild('Correo').equalTo(perfil.Correo).on('value', (snapshot) => {
      try{
      var arr = snapshot.val();
      var arr2 = Object.keys(arr);
      var key = arr2[0];
      //console.log('barrido '+key)
      }catch(e){}
      
      if(z==true){
      if (key!=null){
        z=false;
        //console.log('entre');
        this.afd.list('/Perfiles/').update(key,perfil);
      }else{
        z=false;
       this.afd.list('/Perfiles/').push(perfil);        
      }}
    });
  }
  
 getPerfil(id,callback){
  let pf:any;
  firebase.database().ref('/Perfiles/').orderByChild('Correo').equalTo(id).on('value',function(snapshot){
  try{
  var arr = snapshot.val();
  var arr2 = Object.keys(arr);
  var key = arr2[0];
  var x=snapshot.child(key).val();
  pf=x;}catch(e){}
  callback(pf);
});
}

  getImgs(){
    let promise = new Promise((resolve, reject) =>{
      this.db.ref('/imgs_perfiles').on('value', (snapshot) =>{
        try{
          let images = snapshot.val();
          console.log(images);
          resolve(images);
        }catch(err){
          reject(err);
        }
      })
    })
    return promise
  }
   
}
