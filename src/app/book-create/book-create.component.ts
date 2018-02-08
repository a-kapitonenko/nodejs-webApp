import { Component, OnInit, ViewEncapsulation,  EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";


import { UploadEvent, UploadFile } from 'ngx-file-drop';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; 
/* 
@Component({
    selector: 'app-book-create',
    template: `
      <input type="file" (change)="uploadFile($event)" />
      <div>{{ uploadPercent | async }}</div>
      <a [href]="downloadURL | async">{{ downloadURL | async }}</a>
   `
  })
  export class BookCreateComponent {
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    constructor(private storage: AngularFireStorage) {}
    uploadFile(event) {
      const file = event.target.files[0];
      const filePath = '/test';
      const task = this.storage.upload(filePath, file);
      
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      this.downloadURL = task.downloadURL();
    }
  } */

  @Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {

    book: Book={} ;
     public downloadURL: Observable<string>;
     snapshot: Observable<any>;
     task: AngularFireUploadTask;
     filePath: string;

    public files: UploadFile[] = null;
 
    public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      file.fileEntry.file(info => {
        console.log(info);
         this.uploadFiles(info);
        
      });
    }
    setTimeout(()=>{    //<<<---    using ()=> syntax
        // get notified when the download URL is available
        this.downloadURL = this.task.downloadURL();
        this.downloadURL.subscribe(res => {
            this.book.image=res;
                 
        });

   },800);
    // observe percentage changes
    
  }
 
  public fileOver(event){
    console.log(event);
  }
 
    public fileLeave(event){
    console.log(event);
    }

    constructor(private repository: BookRepository, private router: Router, 
        private storage: AngularFireStorage) {
    }

    ngOnInit() {
        
    }

    otherImage(){
        this.files= null;
        this.downloadURL = null;

    }    

    uploadFiles(file) {
        if(file.type.indexOf('image')===-1){
            this.files=null;
        } else { 
            //this.uploadFiles(info);
            //const file = info;
            this.filePath = `/${new Date().getTime()}_${file.name}`;
            this.task = this.storage.upload(this.filePath, file);
            
            
        }
        /* 
        let filePath = `/${new Date().getTime()}_${file.name}`;
        console.log(filePath);
        this.task = this.storage.upload(filePath, file);

        this.uploadPercent = this.task.percentageChanges();
        // get notified when the download URL is available
        this.downloadURL = this.task.downloadURL();

        /* this.path = `/${new Date().getTime()}_${this.files[0].relativePath}`;
        console.log ("path"+this.path);
        this.task = this.storage.upload(this.path, this.files[0].fileEntry);
        console.log ("sended");
        this.downloadURL = this.task.downloadURL(); 
        console.log(this.downloadURL);*/
    } 
    

    getImage(){
        
        
        
    }
 
    saveBook() {
    
        this.repository.saveBook(this.book, null);
        this.router.navigate(['/books']);
        
        
        /* this.http.post('/book', this.book)
            .subscribe(res => {
                    let id = res['_id'];
                    this.router.navigate(['/book-details', id]);
                }, (err) => {
                    console.log(err);
                }
            );*/
    } 

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(category){
        this.book.category=category;
    }

}
