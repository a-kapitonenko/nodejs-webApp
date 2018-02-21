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

  constructor(private repository: BookRepository,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.query=this.route.snapshot.params['text'];
    this.findBooks();
    this.router.events.subscribe((event) => {
      console.log(event);
      this.query=this.route.snapshot.params['text'];
      this.findBooks();
  });
  }
  
  

  findBooks(){
    this.repository.searchBooks(this.query).subscribe(res =>{
      this.books=res;
      console.log(this.books);
      this.isFound = true;
    });
  }

}
