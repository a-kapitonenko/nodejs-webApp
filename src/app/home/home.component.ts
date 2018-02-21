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
  lastBooks1: any[]=[];
  lastBooks2: any[]=[];

  
  constructor(private repository: BookRepository) { }

  ngOnInit() {
    this.getAllTags();
    this.getLast();
  }

  getAllTags(){
    this.repository.getAllTags().subscribe(res=>{
      this.allTags=res;
      for(let tag of this.allTags){
        if(tag.books.length==0){
          this.allTags.splice(this.allTags.findIndex(p=>p._id==tag._id),1);
        }
      }      
    });
}

  getLast(){
      this.repository.getBooks().subscribe(res=>{
        let lastBooks=res.reverse(); 
        if(lastBooks.length==6){
          this.lastBooks1 = res.slice(0,2);
          this.lastBooks2 = res.slice(3,5);
        } else if(lastBooks.length>3){
          this.lastBooks1 = res.slice(0,3);
          this.lastBooks2 = res.slice(3,lastBooks.length);
        } else {
          this.lastBooks1 = res;
        }   
        
      });

  }



}
