import { Component, OnInit } from '@angular/core';
//import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BookRepository } from "../model/book.repository";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allTags: any[]=[];


  
  constructor(private repository: BookRepository) { }

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags(){
    this.repository.getAllTags().subscribe(res=>{
      this.allTags=res;
      for(let tag of this.allTags){
        if(tag.books.length==0){
          this.allTags.splice(tag.books.findIndex(p=>p._id==tag._id),1);
        }
      }      
    });
}


}
