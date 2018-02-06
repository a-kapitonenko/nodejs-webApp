import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

 private category: string=null;

  constructor(private repository: BookRepository,private route: ActivatedRoute) { 
   
  }

  get books(): Book[]{
      return this.repository.getBooks(this.category);;
  }
    ngOnInit() {
        this.category = this.route.snapshot.params['mode'];
        //this.books=this.repository.getBooks();
       /* this.http.get('/book').subscribe(data => {
        this.books = data;
    }); */
    }

}
