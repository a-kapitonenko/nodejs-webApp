import { Component, OnInit, ViewEncapsulation,  EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { Tag } from "../model/tag.model";

import { UploadEvent, UploadFile } from 'ngx-file-drop';


import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; 

import { User } from '../model/user.model';
import { UserRepository } from '../model/user.repository';
import {ImageuploadService} from '../imageUpload.service';

  @Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {

    book: Book={} ;
    public downloadURL: Observable<string>;
    isLoading=false;
    tags:any[]=[];
    items: any[]=[];
    allTags: any[];

    public dropped(event: UploadEvent) {
        this.isLoading = true;
        for (const file of event.files) {
            file.fileEntry.file(info => {
              console.log(info);
              this.imageService.sendFile(info).subscribe(res => {
                console.log(res);
                this.book.image=res;
                console.log(this.book.image);
                this.isLoading = false;
                console.log(this.isLoading);
                     
            });;
        });
        }    
  } 

  getAllTags(){
      this.repository.getAllTags().subscribe(res=>{
        this.allTags=res.map(p=>p.name);
      });
  }

  /* saveTags(){
      for(let tag of this.tags){
          tag.books=[];
          console.log(tag.name);
          this.repository.saveTag(tag,this.book);
      }
  } */

  onItemAdded($event){
      this.tags.push($event);
      console.log(this.tags);
    //this.repository.saveTag($event,this.book);
  }

  onItemRemoved($event){
      this.tags.splice(this.tags.findIndex(p=> p.name==$event.name),1);
      console.log(this.tags);
  }

 
  

    constructor(private repository: BookRepository, private router: Router, 
         private userRepository: UserRepository, private imageService: ImageuploadService) {
            
    }

    ngOnInit() {
        this.getAllTags();
    }

    otherImage(){
        this.book.image = null;

    }    
 
    saveBook() {
        this.book.author = this.userRepository.selectedUser._id;
        
        this.repository.saveBook(this.book, null,this.tags);
        this.router.navigate(['/books']);
    }     

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(category){
        this.book.category=category;
    }

}
