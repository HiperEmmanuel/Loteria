import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
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
  records = { partidas: false,
    mejorestablas: false,
    ganadores: false,
    chorros: false,
    cuatroesquinas: false,
    centritos: false,
    perdedores: false};
  game_id: any;
  players: any;
  user:any;
  email: any;
  cosas:any = {full:0,blast:0,quarter:0, center:0, total:0};

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
  };
  public barChartLabels:string[] = ['Total'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [ this.cosas.total], label: 'Jugadas'},
    {data: [ this.cosas.full], label: 'Ganadas'},
    {data: [ this.cosas.blast], label: 'Chorros'},
    {data: [ this.cosas.quarter], label: '4 Esquinas'},
    {data: [ this.cosas.center], label: 'Centros'}
  ];
  public options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};
  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private pp: PartidaProvider,
    public events: Events) {
    this.user = firebase.auth().currentUser;
    pp.getGamesWhereWin(this.user.email).then(mi_codigo_mi_variable => {
      this.cosas = mi_codigo_mi_variable;
      this.barChartData = [
        {data: [ this.cosas.total], label: 'Jugadas'},
        {data: [ this.cosas.full], label: 'Ganadas'},
        {data: [ this.cosas.blast], label: 'Chorros'},
        {data: [ this.cosas.quarter], label: '4 Esquinas'},
        {data: [ this.cosas.center], label: 'Centros'}
      ];
    });

    events.subscribe('openRecord',(records) =>{
      this.records = records;
    });
  }

  ionViewWillEnter(){
    this.records = { partidas: true,
      mejorestablas: false,
      ganadores: false,
      chorros: false,
      cuatroesquinas: false,
      centritos: false,
      perdedores: false};
    this.menu.enable(true,'menurecords');
    this.pp.getGamesWhereWin(this.user.email).then(mi_codigo_mi_variable => {
      this.cosas = mi_codigo_mi_variable;
      this.barChartData = [
        {data: [ this.cosas.total], label: 'Jugadas'},
        {data: [ this.cosas.full], label: 'Ganadas'},
        {data: [ this.cosas.blast], label: 'Chorros'},
        {data: [ this.cosas.quarter], label: '4 Esquinas'},
        {data: [ this.cosas.center], label: 'Centros'}
      ];
    });
  }

  ionViewWillLeave(){
    this.menu.enable(false,'menurecords');
  }

}
