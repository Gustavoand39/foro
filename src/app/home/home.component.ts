import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor( private rest: ApiRestService, private msg: ToastrService) { }

  ngOnInit(): void {
    this.readTopics();
    this.rest.userObs$.subscribe( u => {this.user = u;} );
    
  }

  readTopics(url:string = ""){
    this.rest.getTopics(url).subscribe(
      r => {
        this.topics = r.data;
        let pages = r.links;
        pages.pop()
        pages.shift()
        this.pages = pages
      }
    );
  }

  createTopic(){
    this.rest.postTopics(this.newTopic).subscribe(
      r => {
        this.readTopics();
        this.msg.success("Tema agregado");
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
        this.msg.info("¡Tema modificado!");
      },
    );
  }

  deleteTopic(){
    this.rest.deleteTopics(this.tmpTopic).subscribe(
      r => {
        this.readTopics();
        this.msg.warning("¡Tema eliminado!");
      },
    );
  }
}
