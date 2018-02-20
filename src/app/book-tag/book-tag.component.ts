import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-tag',
  templateUrl: './book-tag.component.html',
  styleUrls: ['./book-tag.component.css']
})
export class BookTagComponent implements OnInit {

  private category: string=null;
  tagId: string=null;
  books: Book[]=[];

  constructor(private repository: BookRepository,private route: ActivatedRoute) { 
   
  }

/*  get books(): Book[]{

      return this.repository.getBooks(this.category);

  }  */

  getBooksByTag(){
    
      this.repository.getTag(this.tagId).subscribe(res=>{
      console.log("tag:"+ res.name);
      for(let bookId of res.books){
        console.log("book:"+ bookId);
        this.repository.getBook(bookId).subscribe(res=>{
          this.books.push(res);
        });
      
    }
  });
    
  }

  ngOnInit() {
    this.tagId=this.route.snapshot.params['tagId'];
    this.getBooksByTag();
  }

}

