import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

import { UploadEvent, UploadFile } from 'ngx-file-drop';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; 
import {ImageuploadService} from '../imageUpload.service';

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit {

    book : Book= {};

    public downloadURL: Observable<string>;
    isLoading=false;
   

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

    constructor(private repository: BookRepository, private router: Router, 
        private storage: AngularFireStorage,  private route: ActivatedRoute, private imageService: ImageuploadService) {
            
    }

    otherImage(){
        this.downloadURL = null;      
    }        

    ngOnInit() {
        
            this.getBook(this.route.snapshot.params['id']);
       
    }

    getBook(id) {
        this.repository.getBook(id).subscribe(res=>{
            this.book=res;
        }
        );
    }

    updateBook(id) {
        this.repository.saveBook(this.book,id);
        this.router.navigate(['/book-details',id ]);
    }

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(category){
        this.book.category=category;
    }

}
