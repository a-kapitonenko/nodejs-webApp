import { Component, OnInit, ViewEncapsulation,  EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    user: any;
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
              this.imageService.sendFile(info).subscribe(res => {
                this.book.image=res;
                this.isLoading = false;
                this.cdRef.detectChanges();
                     
            });;
        });
        }    
  } 

  getAllTags(){ 
      this.repository.getAllTags().subscribe(res=>{
        this.allTags=res.map(p=>p.name);
      });
  }
  onItemAdded($event){
      this.tags.push($event);
      console.log(this.tags);
  }

  onItemRemoved($event){
      this.tags.splice(this.tags.findIndex(p=> p.name==$event.name),1);
      console.log(this.tags);
  }
    constructor(private repository: BookRepository, private router: Router, 
            private userRepository: UserRepository, private cdRef:ChangeDetectorRef, private imageService: ImageuploadService,
            private route: ActivatedRoute) {
        this.userRepository.getUser(this.route.snapshot.params['id']).subscribe(data => {
            if(data == null) {
                this.router.navigate(['']);
            } else{
                this.user = data;
            }
        });
    }

    ngOnInit() {
        this.getAllTags();
    }

    otherImage(){
        this.book.image = null;

    }    
 
    saveBook() {
        this.book.author = this.user._id;
        this.book.rating=null;
        this.repository.saveBook(this.book, null,this.tags);
        this.router.navigate(['/']);
    }     

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(category){
        this.book.category=category;
    }

}
