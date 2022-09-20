import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topics = [{id:0, title:'', user_id:0}, {id:1, title:'redes', user_id:2}, 
  {id:2, title:'Programación', user_id:2}, {id:3, title:'Calculo', user_id:2}];
  newTopic = {id:0, title:'', user_id:0};
  pages = [{url:'', label:'', active:false}];
  tmpTopic = {id:0, title:'', user_id:0};
  user = {id:0, username:"", role:""};

  constructor( private rest: ApiRestService) { }

  ngOnInit(): void {
    this.readTopics();
    this.rest.userObs$.subscribe( u => {this.user = u;} );
    
  }

  readTopics(url:string = ""){
    this.rest.getTopics(url).subscribe(
      r => {
        this.topics = r.data;
        this.pages = r.links;
      }
    );
  }

  createTopic(){
    this.rest.postTopics(this.newTopic).subscribe(
      r => {
        this.readTopics();
      }
    );
  }

  selectTmpTopic(topic:any){ //Seleccionar y guardar lo que seleccione el usuario
    this.tmpTopic = JSON.parse(JSON.stringify(topic));
  }

  updateTopic(){
    this.rest.putTopics(this.tmpTopic).subscribe(
      r => {
        this.readTopics();
      },
    );
  }

  deleteTopic(){
    this.rest.deleteTopics(this.tmpTopic).subscribe(
      r => {
        this.readTopics();
      },
    );
  }
}
