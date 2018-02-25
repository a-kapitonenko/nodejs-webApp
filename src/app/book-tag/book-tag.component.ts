import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { ActivatedRoute, Router } from '@angular/router';
import { UserRepository } from '../model/user.repository';

@Component({
  selector: 'app-book-tag',
  templateUrl: './book-tag.component.html',
  styleUrls: ['./book-tag.component.css']
})
export class BookTagComponent implements OnInit {

  private category: string=null;
  tagId: string=null;
  books: Book[]=[];
  book: any={};

  constructor(private repository: BookRepository,private route: ActivatedRoute, 
    private userRepository: UserRepository) { 
   
  }

  getBooksByTag(){
    
      this.repository.getTag(this.tagId).subscribe(res=>{
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

