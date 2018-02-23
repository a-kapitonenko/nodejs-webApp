import { Component, OnInit } from '@angular/core';
//import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BookRepository } from "../model/book.repository";
import { NgClass } from '@angular/common';
import { DateService } from '../date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allTags: any[]=[];
  lastBooks1: any[]=[];
  lastBooks2: any[]=[];
  bestBooks1: any[]=[];
  bestBooks2: any[]=[];

  
  constructor(private repository: BookRepository, private dateService: DateService) { }

  ngOnInit() {
    
    
    this.getLast();
    this.getBest();
    setTimeout(()=>{
    this.getAllTags();
    },500);
  }


  getAllTags(){
    this.repository.getAllTags().subscribe(res=>{
      console.log("tags loaded");
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
        let lastBooks=res; 
        if(lastBooks.length==6){
          this.lastBooks1 = res.slice(0,3);
          this.lastBooks2 = res.slice(3,6);
        } else if(lastBooks.length>3){
          this.lastBooks1 = res.slice(0,3);
          this.lastBooks2 = res.slice(3,lastBooks.length);
        } else {
          this.lastBooks1 = res;
        }   
        
      });

  }

  getBest(){
    this.repository.getBestBooks().subscribe(res=>{       
        let bestBooks=res;    
        if(bestBooks.length==6){
          this.bestBooks1 =bestBooks.slice(0,3);
          this.bestBooks2 = bestBooks.slice(3,6);
        } else if(bestBooks.length>3){
          this.bestBooks1 = bestBooks.slice(0,3);
          this.bestBooks2 = bestBooks.slice(3,bestBooks.length);
        } else {
          this.bestBooks1 = bestBooks;
        }              
    });

}



}
