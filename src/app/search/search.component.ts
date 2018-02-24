import { Component, OnInit } from '@angular/core';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query : string;
  books: Book[]=[];
  isFound: boolean = false;
  isEmpty = false;
  searchElse = false;

  constructor(private repository: BookRepository,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.query=this.route.snapshot.params['text'];
    this.findBooks(this.query);
     this.router.events.subscribe((event) => {
      console.log(event);
      let query=this.route.snapshot.params['text'];
      if(query!=this.query){
        this.query=query;
        this.findBooks(this.query);
      }   
  }); 
  }
  
  

  findBooks(query: string){
      this.repository.searchBooks(query).subscribe(res =>{
      if(res[0]==null){
        this.isEmpty = true;
      } else {
        this.isEmpty=false;
      }
      this.books=res;
      console.log(this.books);
      this.isFound = true;
    });

    
  }

}
